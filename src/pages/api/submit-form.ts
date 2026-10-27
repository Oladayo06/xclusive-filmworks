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

        if (!resendApiKey) {
            return new Response(
                JSON.stringify({ error: 'RESEND_API_KEY is missing or empty — not reaching the Worker from Cloudflare' }),
                { status: 500, headers: { 'Content-Type': 'application/json' } }
            )
        }

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
    } catch (err) {
        const message = err instanceof Error ? err.message : String(err)
        return new Response(JSON.stringify({ error: `Server error: ${message}` }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        })
    }
}