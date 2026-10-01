import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import Ajv2020 from 'ajv/dist/2020.js'
import addFormats from 'ajv-formats'

const root = 'src/data'
const schemaDir = join(root, 'schemas')
const ajv = new Ajv2020({ allErrors: true, strict: false })
addFormats(ajv)
for (const schema of ['common.schema.json'])
  ajv.addSchema(JSON.parse(readFileSync(join(schemaDir, schema), 'utf8')))
const errors = []

export function validateStrings(value, file, path = '') {
  if (typeof value === 'string') {
    // A transcription reproduces its screenshot verbatim, and digits inside images are
    // exempt from the Western-digit rule (spec clarification 2026-09-28).
    const verbatim = path.endsWith('.transcription')
    if (!verbatim && /[\u0660-\u0669\u06f0-\u06f9]/.test(value))
      errors.push(`${file} › ${path} › Eastern or Persian digit`)
    if (/<\s*[a-z]/i.test(value)) errors.push(`${file} › ${path} › HTML markup`)
  } else if (Array.isArray(value))
    value.forEach((item, index) => validateStrings(item, file, `${path}[${index}]`))
  else if (value && typeof value === 'object')
    Object.entries(value).forEach(([key, item]) =>
      validateStrings(item, file, path ? `${path}.${key}` : key),
    )
}

export function inspectStrings(value, file) {
  const before = errors.length
  validateStrings(value, file)
  return errors.slice(before)
}

function readJson(file) {
  return JSON.parse(readFileSync(file, 'utf8'))
}
function checkSchema(file, schemaName) {
  const data = readJson(file)
  validateStrings(data, file)
  const schema = readJson(join(schemaDir, schemaName))
  const validate = ajv.compile(schema)
  if (!validate(data))
    for (const error of validate.errors ?? [])
      errors.push(`${file} › ${error.instancePath || '/'} › ${error.message}`)
  return data
}
function uniqueOrders(collection, file) {
  const orders = collection.map((entry) => entry.order)
  if (
    orders.some((order) => !Number.isInteger(order) || order < 1) ||
    new Set(orders).size !== orders.length
  )
    errors.push(`${file} › collection › order must be unique positive integers`)
}

export function validateContent() {
  errors.length = 0
  const journeyFile = join(root, 'journey.json')
  const pricingFile = join(root, 'pricing.json')
  const journey = checkSchema(journeyFile, 'journey.schema.json')
  const pricing = checkSchema(pricingFile, 'pricing.schema.json')
  const faqFile = join(root, 'faqs.json')
  if (existsSync(faqFile)) uniqueOrders(checkSchema(faqFile, 'faqs.schema.json').items, faqFile)
  const testimonialsFile = join(root, 'testimonials.json')
  if (existsSync(testimonialsFile)) checkSchema(testimonialsFile, 'testimonials.schema.json')
  const transformationsFile = join(root, 'transformations.json')
  if (existsSync(transformationsFile))
    uniqueOrders(
      checkSchema(transformationsFile, 'transformations.schema.json').items,
      transformationsFile,
    )
  uniqueOrders(journey.steps, journeyFile)
  uniqueOrders(pricing.tiers, pricingFile)
  const [single, bundle] = pricing.tiers
  const expected = single.price * bundle.duration.count - bundle.price
  const savings = (bundle.note?.en ?? '').match(/\d+/)?.[0]
  if (Number(savings) !== expected)
    errors.push(`${pricingFile} › ${bundle.id} › bundle savings mismatch`)
  const en = checkSchema(join(root, 'copy/en.json'), 'copy.schema.json')
  const ar = checkSchema(join(root, 'copy/ar.json'), 'copy.schema.json')
  const keys = (value) => JSON.stringify(Object.keys(value).sort())
  const compare = (left, right, path = '') => {
    if (!left || !right || typeof left !== 'object' || typeof right !== 'object') return
    const own = (value) =>
      Object.fromEntries(Object.entries(value).filter(([key]) => key !== '_meta'))
    if (keys(own(left)) !== keys(own(right)))
      errors.push(`copy › ${path || '/'} › language key mismatch`)
    for (const key of Object.keys(left).filter((key) => key !== '_meta'))
      compare(left[key], right[key], path ? `${path}.${key}` : key)
  }
  compare(en, ar)
  if (errors.length) return false
  return true
}

if (process.argv[1]?.endsWith('validate-content.mjs')) {
  if (!validateContent()) {
    console.error(errors.join('\n'))
    process.exitCode = 1
  } else console.log('Content validation passed.')
}
