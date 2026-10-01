import { describe, expect, it } from 'vitest'
import { inspectStrings } from '../../scripts/validate-content.mjs'

describe('content text rules', () => {
  it('rejects Eastern digits and markup', () => {
    expect(inspectStrings('١٢٣', 'fixture')).toContain('fixture ›  › Eastern or Persian digit')
    expect(inspectStrings('<b>unsafe</b>', 'fixture')).toContain('fixture ›  › HTML markup')
  })
})
