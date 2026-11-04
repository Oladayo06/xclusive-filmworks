export function attachFormHandler(form: HTMLFormElement, formType: string) {
    const statusEl = form.querySelector<HTMLParagraphElement>('[data-status]')
    const submitBtn = form.querySelector<HTMLButtonElement>('button[type="submit"]')

    form.addEventListener('submit', async (e) => {
        e.preventDefault()

        const formData = new FormData(form)
        const payload: Record<string, string> = { formType }
        formData.forEach((value, key) => {
            payload[key] = String(value)
        })

        if (submitBtn) {
            submitBtn.disabled = true
            submitBtn.dataset.originalText = submitBtn.dataset.originalText || submitBtn.textContent || ''
            submitBtn.textContent = 'Sending...'
        }
        if (statusEl) {
            statusEl.textContent = ''
            statusEl.className = 'form-status'
        }

        try {
            const res = await fetch('/api/submit-form', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            })

            const data = await res.json().catch(() => ({}))

            if (!res.ok) {
                throw new Error(data.error || `Request failed with status ${res.status}`)
            }

            if (statusEl) {
                statusEl.textContent = "Thanks — we've received your message and will be in touch soon."
                statusEl.className = 'form-status success'
            }
            form.reset()
        } catch (err) {
            if (statusEl) {
                statusEl.textContent = `Error: ${err instanceof Error ? err.message : 'Unknown error'}`
                statusEl.className = 'form-status error'
            }
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false
                submitBtn.textContent = submitBtn.dataset.originalText || 'Send'
            }
        }
    })
}