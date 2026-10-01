export type LeadFields = Record<string, string>
export async function submitLead(fields: LeadFields): Promise<'success' | 'error' | 'offline'> {
  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), 10_000)
  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(fields),
      signal: controller.signal,
    })
    const result = await response.json()
    if (result.success === true) return 'success'
    console.warn('Web3Forms submission failed:', result.message)
    return 'error'
  } catch {
    return 'offline'
  } finally {
    window.clearTimeout(timeout)
  }
}
