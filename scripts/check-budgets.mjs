import { brotliCompressSync, constants } from 'node:zlib'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

function compressedSize(files) {
  return files.reduce(
    (sum, path) =>
      sum +
      brotliCompressSync(readFileSync(path), { params: { [constants.BROTLI_PARAM_QUALITY]: 11 } })
        .byteLength,
    0,
  )
}
function filesIn(dir, pattern) {
  try {
    return readdirSync(dir)
      .filter((name) => pattern.test(name))
      .map((name) => join(dir, name))
  } catch {
    return []
  }
}
for (const [label, pattern, max] of [
  ['Arabic fonts', /^(cairo|tajawal)-arabic-.*\.woff2$/, 80 * 1024],
  ['Latin fonts', /^manrope-.*\.woff2$/, 50 * 1024],
]) {
  const files = filesIn('public/fonts', pattern)
  if (files.length === 0) throw new Error(`${label} subsets are missing; run npm run fonts`)
  const size = compressedSize(files)
  console.log(`${label}: ${(size / 1024).toFixed(1)} KB / ${max / 1024} KB`)
  if (size > max) throw new Error(`${label} exceed budget`)
}
const html = readFileSync('dist/en/index.html', 'utf8')
const initialJsBudget = 78 * 1024
const script = html.match(/<script>(.*?)<\/script>/s)?.[1] ?? ''
if (!script || Buffer.byteLength(script) > 1024)
  throw new Error('Inline head script is missing or exceeds 1 KB')
const chunks = [...html.matchAll(/src="([^"]+\.js)"/g)]
  .map((match) => join('dist', match[1].replace(/^\//, '')))
  .filter((path) => statSync(path).isFile())
const jsSize = compressedSize(chunks)
console.log(`Initial JavaScript: ${(jsSize / 1024).toFixed(1)} KB brotli`)
if (jsSize > initialJsBudget)
  throw new Error(`Initial JavaScript exceeds ${(initialJsBudget / 1024).toFixed(0)} KB brotli`)
