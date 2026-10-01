import { mkdir, writeFile, access } from 'node:fs/promises'
import { spawnSync } from 'node:child_process'

const source = 'assets/fonts-src'
const output = 'public/fonts'
const subsetter =
  process.platform === 'win32' &&
  (await import('node:fs').then(({ existsSync }) =>
    existsSync('.venv-fonttools/Scripts/pyftsubset.exe'),
  ))
    ? '.venv-fonttools/Scripts/pyftsubset.exe'
    : 'pyftsubset'
const python = process.platform === 'win32' ? '.venv-fonttools/Scripts/python.exe' : 'python3'
await mkdir(source, { recursive: true })
await mkdir(output, { recursive: true })
const latinRange =
  'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2212'
const arabicRange =
  'U+0600-06FF,U+0750-077F,U+FB50-FDFF,U+FE70-FEFF,U+0020-0040,U+005B-0060,U+007B-007E,U+0030-0039,U+00AB,U+00BB,U+200C-200F,U+2013-2014,U+2018-201E,U+2026'
const fonts = [
  {
    remote: 'ofl/manrope/Manrope[wght].ttf',
    name: 'Manrope[wght].ttf',
    outputName: 'manrope-latin-var',
    unicodeRange: latinRange,
  },
  {
    remote: 'ofl/cairo/Cairo[slnt,wght].ttf',
    name: 'Cairo[slnt,wght].ttf',
    outputName: 'cairo-arabic-900',
    unicodeRange: arabicRange,
    axes: ['wght=900', 'slnt=0'],
  },
  {
    remote: 'ofl/tajawal/Tajawal-Regular.ttf',
    name: 'Tajawal-Regular.ttf',
    outputName: 'tajawal-arabic-400',
    unicodeRange: arabicRange,
  },
  {
    remote: 'ofl/tajawal/Tajawal-Bold.ttf',
    name: 'Tajawal-Bold.ttf',
    outputName: 'tajawal-arabic-700',
    unicodeRange: arabicRange,
  },
]
for (const font of fonts) {
  const { remote, name, outputName, unicodeRange, axes } = font
  const target = `${source}/${name}`
  let cached = true
  try {
    await access(target)
  } catch {
    cached = false
  }
  if (!cached) {
    const response = await fetch(`https://raw.githubusercontent.com/google/fonts/main/${remote}`)
    if (!response.ok) throw new Error(`Font download failed (${response.status}): ${remote}`)
    await writeFile(target, Buffer.from(await response.arrayBuffer()))
  }
  let subsetTarget = target
  if (axes) {
    subsetTarget = `${source}/Cairo-Black.ttf`
    const instance = spawnSync(
      python,
      ['-m', 'fontTools.varLib.instancer', target, ...axes, '--static', '-o', subsetTarget],
      { stdio: 'inherit' },
    )
    if (instance.status !== 0) throw new Error('Could not create the Cairo Black font instance.')
  }
  const args = [
    '--flavor=woff2',
    '--no-hinting',
    '--layout-features=*',
    `--unicodes=${unicodeRange}`,
    `--output-file=${output}/${outputName}.woff2`,
    subsetTarget,
  ]
  const result = spawnSync(subsetter, args, { stdio: 'inherit' })
  if (result.status !== 0)
    throw new Error('pyftsubset failed; install fonttools with brotli support.')
}
for (const [family, filename] of [
  ['cairo', 'Cairo-OFL.txt'],
  ['tajawal', 'Tajawal-OFL.txt'],
]) {
  const response = await fetch(`https://raw.githubusercontent.com/google/fonts/main/ofl/${family}/OFL.txt`)
  if (!response.ok) throw new Error(`Font license download failed (${response.status}): ${family}`)
  await writeFile(`${output}/${filename}`, await response.text())
}
const { stat } = await import('node:fs/promises')
const arabicBytes =
  (await stat(`${output}/cairo-arabic-900.woff2`)).size +
  (await stat(`${output}/tajawal-arabic-400.woff2`)).size +
  (await stat(`${output}/tajawal-arabic-700.woff2`)).size
const latinBytes = (await stat(`${output}/manrope-latin-var.woff2`)).size
if (arabicBytes > 80 * 1024)
  throw new Error(`Arabic font subsets exceed 80 KB (${(arabicBytes / 1024).toFixed(1)} KB)`)
if (latinBytes > 50 * 1024)
  throw new Error(`Latin font subset exceeds 50 KB (${(latinBytes / 1024).toFixed(1)} KB)`)
