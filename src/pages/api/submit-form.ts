import type { APIRoute } from 'astro'

export const prerender = false

export const POST: APIRoute = async ({ request, locals }) => {
    try {
        const body = (await request.json()) as Record<string, string>
        const { formType, name, email } = body

        if (!name || !email) {
            return new Response(JSON.stringify({ error: 'Missing required fields' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            })
        }

        const emailBody = Object.entries(body)
            .map(([key, value]) => `${key}: ${value}`)
            .join('\n')

        const env = (locals as any).runtime.env as {
            RESEND_API_KEY: string
            NOTIFY_EMAIL: string
        }

        const resendRes = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${env.RESEND_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from: 'Xclusive Filmworks <onboarding@resend.dev>',
                to: env.NOTIFY_EMAIL,
                reply_to: email,
                subject: `New ${formType || 'Website'} Submission`,
                text: emailBody,
            }),
        })

        if (!resendRes.ok) {
            const errorText = await resendRes.text()
            return new Response(JSON.stringify({ error: errorText }), {
                status: 502,
                headers: { 'Content-Type': 'application/json' },
            })
        }

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        })
    } catch (err) {
        const message = err instanceof Error ? err.message : String(err)
        return new Response(JSON.stringify({ error: `Server error: ${message}` }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        })
    }
}