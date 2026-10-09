import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { createClient } from 'npm:@supabase/supabase-js@2';
import { z } from 'npm:zod@3.25.76';
import { getClientIp, isRateLimited } from '../_shared/rateLimit.ts';

const BodySchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  message: z.string().trim().min(1).max(2000),
});

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  const json = (body: unknown, status: number) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  try {
    if (req.method !== 'POST') {
      return json({ error: 'Method not allowed' }, 405);
    }

    if (isRateLimited(`contact:${getClientIp(req)}`)) {
      return json({ error: 'Too many requests. Please try again shortly.' }, 429);
    }


    let raw: unknown;
    try {
      raw = await req.json();
    } catch {
      return json({ error: 'Invalid JSON body' }, 400);
    }

    const parsed = BodySchema.safeParse(raw);
    if (!parsed.success) {
      return json({ error: 'Invalid input', fields: parsed.error.flatten().fieldErrors }, 400);
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { error } = await supabase.from('contact_submissions').insert(parsed.data);

    if (error) {
      console.error('insert failed', error.message);
      return json({ error: 'Could not save your message' }, 500);
    }

    return json({ success: true }, 200);
  } catch (e) {
    console.error('unexpected error', e instanceof Error ? e.message : String(e));
    return json({ error: 'Unexpected server error' }, 500);
  }
});
