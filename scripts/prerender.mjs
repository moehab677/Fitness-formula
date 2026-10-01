import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'
import { pathToFileURL } from 'node:url'

const template = await readFile('dist/index.html', 'utf8')
const { render } = await import(pathToFileURL(resolve('dist-ssr/entry-server.js')).href)
for (const lang of ['en', 'ar']) {
  for (const route of ['home', 'thanks']) {
    const { html, head, headScript } = render(lang, route)
    const output = route === 'home' ? `dist/${lang}/index.html` : `dist/${lang}/thanks/index.html`
    await mkdir(dirname(output), { recursive: true })
    const dir = lang === 'ar' ? 'rtl' : 'ltr'
    const result = template
      .replace('<html lang="en">', `<html lang="${lang}" dir="${dir}">`)
      .replace(/<title>.*?<\/title>/, '')
      .replace(/<meta name="description".*?>/, '')
      .replace('<!--head-script-->', `<script>${headScript}</script>`)
      .replace('<!--app-head-->', head)
      .replace('<!--app-html-->', html)
      .replace('<body>', `<body data-route="${route}">`)
    await writeFile(output, result)
  }
}
const rootHtml = template
  .replace('<!--head-script-->', `<script>${render('en', 'home').headScript}</script>`)
  .replace(
    '<!--app-head-->',
    '<meta name="robots" content="noindex"><meta http-equiv="refresh" content="0;url=/en/">',
  )
  .replace(
    '<!--app-html-->',
    '<p>Choose a language: <a href="/en/">English</a> · <a href="/ar/">العربية</a></p>',
  )
await writeFile('dist/index.html', rootHtml)
await writeFile('dist/robots.txt', 'User-agent: *\nAllow: /\nSitemap: /sitemap.xml\n')
await writeFile(
  'dist/sitemap.xml',
  '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml"><url><loc>/en/</loc><xhtml:link rel="alternate" hreflang="ar" href="/ar/"/></url><url><loc>/ar/</loc><xhtml:link rel="alternate" hreflang="en" href="/en/"/></url></urlset>',
)
