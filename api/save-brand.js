import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    await supabase.from('advertisers').insert([{
      slot_id: parseInt(data.slot_id),
      brand_name: data.brand_name,
      logo_emoji: data.logo_emoji,
      video_url: data.video_url,
      coupon_code: data.coupon_code,
      target_url: data.target_url,
      expires_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
    }]);

    await supabase.from('slots').update({ status: 'active' }).eq('id', parseInt(data.slot_id));

    res.redirect(303, '/?success=true');
  } else {
    res.status(405).end('Method Not Allowed');
  }
}
