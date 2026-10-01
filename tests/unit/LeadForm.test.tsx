import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { LeadForm } from '../../src/components/LeadForm'
import { LocaleProvider } from '../../src/i18n/LocaleContext'

describe('LeadForm', () => {
  it('renders the submitted name as text after a successful response', async () => {
    const user = userEvent.setup()
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ json: async () => ({ success: true }) }))
    render(
      <LocaleProvider lang="en">
        <LeadForm />
      </LocaleProvider>,
    )
    await user.type(screen.getByLabelText('Name'), '<b>Ada</b>')
    await user.type(screen.getByLabelText('WhatsApp number'), '01012345678')
    await user.type(screen.getByLabelText('What is your goal?'), 'Build a steady routine')
    await user.type(screen.getByLabelText('What has been challenging?'), 'Keeping a schedule')
    await user.selectOptions(screen.getByLabelText('Best time to contact you'), 'morning')
    await user.click(screen.getByRole('button', { name: 'Send my details' }))
    const confirmation = await screen.findByRole('status')
    expect(confirmation).toHaveTextContent("Thanks, <b>Ada</b>. I'll reach out")
    expect(confirmation.querySelector('b')).toBeNull()
    await waitFor(() => expect(fetch).toHaveBeenCalledOnce())
    vi.unstubAllGlobals()
  })
})
