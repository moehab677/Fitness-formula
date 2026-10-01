import { readFileSync, readdirSync } from 'node:fs'
import { join, relative } from 'node:path'

const root = 'src'
const files = []
function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) walk(path)
    else if (/\.(ts|tsx)$/.test(entry.name)) files.push(path)
  }
}
walk(root)
const patterns = [
  // Physical direction utilities. Rounded corners are allowed (constitution v3.0.0) but only
  // logically (rounded-s/e/ss/…), never rounded-l/r/tl/tr/bl/br.
  /\b-?(?:ml|mr|pl|pr|left|right)-\S+/g,
  /\brounded-(?:l|r|tl|tr|bl|br)(?:-\S+)?\b/g,
  /\btext-(?:left|right)\b/g,
  /#[0-9a-fA-F]{3,8}\b/g,
  /\[[0-9.]+px\]/g,
]
let failed = false
for (const file of files) {
  const lines = readFileSync(file, 'utf8').split(/\r?\n/)
  lines.forEach((line, index) => {
    const matched = patterns.some((pattern) => {
      pattern.lastIndex = 0
      return pattern.test(line)
    })
    if (matched) {
      console.error(`${relative('.', file)}:${index + 1}: disallowed physical or arbitrary style`)
      failed = true
      patterns.forEach((pattern) => (pattern.lastIndex = 0))
    }
  })
}
if (failed) process.exitCode = 1
