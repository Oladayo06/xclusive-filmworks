import type { APIRoute } from 'astro'
import { env } from 'cloudflare:workers'

export const prerender = false

export const POST: APIRoute = async ({ request }) => {
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

        const resendApiKey = (env as any).RESEND_API_KEY as string
        const notifyEmail = (env as any).NOTIFY_EMAIL as string

        const resendRes = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${resendApiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from: 'Xclusive Filmworks <onboarding@resend.dev>',
                to: notifyEmail,
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
    } catch {
        return new Response(JSON.stringify({ error: 'Server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        })
    }
}