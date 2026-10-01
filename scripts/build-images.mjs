import { mkdir, readFile, writeFile } from 'node:fs/promises'
import sharp from 'sharp'

const config = JSON.parse(await readFile('assets.config.json', 'utf8'))
const manifest = {}
await mkdir('public/img', { recursive: true })
await mkdir('src/generated', { recursive: true })

async function render(key, source, options = {}) {
  const meta = await sharp(source).metadata()
  const widths = options.widths ?? config.testimonialWidths ?? [480, 960]
  const formats = options.formats ?? config.formats ?? ['avif', 'webp', 'jpeg']
  const sources = { avif: [], webp: [], jpeg: [] }
  for (const width of widths) {
    for (const format of formats) {
      const path = `public/img/${key}-${width}.${format}`
      let image
      if (options.removeRows) {
        const [start, end] = options.removeRows
        const outputHeight = meta.height - (end - start)
        const top = await sharp(source)
          .extract({ left: 0, top: 0, width: meta.width, height: start })
          .png()
          .toBuffer()
        const bottom = await sharp(source)
          .extract({ left: 0, top: end, width: meta.width, height: meta.height - end })
          .png()
          .toBuffer()
        const cropped = await sharp({
          create: { width: meta.width, height: outputHeight, channels: 4, background: '#fff' },
        })
          .composite([
            { input: top, top: 0, left: 0 },
            { input: bottom, top: start, left: 0 },
          ])
          .png()
          .toBuffer()
        image = sharp(cropped)
      } else image = sharp(source)
      image = image.resize({ width, withoutEnlargement: true })
      if (format === 'jpeg') image = image.jpeg({ quality: 82 })
      if (format === 'webp') image = image.webp({ quality: 82 })
      if (format === 'avif') image = image.avif({ quality: 55 })
      await image.toFile(path)
      sources[format].push(`/${path.replace(/^public\//, '')}`)
    }
  }
  manifest[key] = {
    width: meta.width,
    height: meta.height,
    sources,
    placeholder: options.placeholder ?? false,
  }
}

for (const photo of config.photos) {
  for (const variant of ['mobile', 'desktop'])
    await render(`${photo.key}-${variant}`, photo[variant].source, {
      widths: config.photoWidths ?? [640, 960, 1280, 1920],
      formats: config.formats ?? ['avif', 'webp', 'jpeg'],
      placeholder: photo.placeholder,
    })
  manifest[photo.key] = {
    variants: {
      mobile: manifest[`${photo.key}-mobile`],
      desktop: manifest[`${photo.key}-desktop`],
    },
    width: photo.desktop.width,
    height: photo.desktop.height,
    placeholder: photo.placeholder,
  }
}
for (const item of config.testimonials)
  await render(item.key, item.source, {
    widths: config.testimonialWidths ?? [480, 960],
    formats: config.formats ?? ['avif', 'webp', 'jpeg'],
    removeRows: item.removeRows,
  })

const logo = config.logo
for (const size of logo.sizes) {
  for (const format of ['webp', 'png']) {
    const output = `public/img/logo-gray-${size}.${format}`
    const pipeline = sharp(logo.source).grayscale().resize(size, size, { fit: 'cover' })
    if (format === 'webp') await pipeline.clone().webp().toFile(output)
    else await pipeline.clone().png().toFile(output)
    const { data, info } = await sharp(output)
      .removeAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true })
    for (let i = 0; i < data.length; i += info.channels)
      if (Math.abs(data[i] - data[i + 1]) > 2 || Math.abs(data[i + 1] - data[i + 2]) > 2)
        throw new Error('Logo output is not grayscale')
  }
}
manifest.logo = {
  width: 192,
  height: 192,
  sources: { webp: ['/img/logo-gray-192.webp'], png: ['/img/logo-gray-192.png'] },
  placeholder: false,
}
if (
  process.env.SITE_ENV === 'production' &&
  Object.values(manifest).some((item) => item.placeholder)
)
  throw new Error('Production image build contains placeholder photos')
await writeFile('src/generated/image-manifest.json', `${JSON.stringify(manifest, null, 2)}\n`)
