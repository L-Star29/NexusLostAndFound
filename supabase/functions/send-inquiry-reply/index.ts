import { Resend } from 'npm:resend';

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json',
};

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { toEmail, itemName, question, reply } = await request.json();

    if (!toEmail || !reply) {
      return new Response(JSON.stringify({ error: 'Missing email or reply body.' }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    const result = await resend.emails.send({
      from: 'Nexus Admin <onboarding@resend.dev>',
      to: [toEmail],
      subject: `Reply about ${itemName ?? 'your lost item inquiry'}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
          <h2 style="margin-bottom: 12px;">Nexus Inquiry Reply</h2>
          <p><strong>Item:</strong> ${itemName ?? 'Lost Item'}</p>
          <p><strong>Your question:</strong></p>
          <p>${question ?? 'No question was provided.'}</p>
          <hr style="margin: 20px 0;" />
          <p><strong>Admin response:</strong></p>
          <p>${reply}</p>
        </div>
      `,
    });

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
});
