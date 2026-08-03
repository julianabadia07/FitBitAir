export default function handler(req, res) {
  const clientId    = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = 'https://fit-bit-air.vercel.app/callback';

  if (!clientId) {
    return res.status(500).json({ error: 'GOOGLE_CLIENT_ID no configurado.' });
  }

  const scopes = [
    'https://www.googleapis.com/auth/fitness.activity.read',
    'https://www.googleapis.com/auth/fitness.heart_rate.read',
    'https://www.googleapis.com/auth/fitness.sleep.read',
    'https://www.googleapis.com/auth/userinfo.email',
  ].join(' ');

  const params = new URLSearchParams({
    client_id:     clientId,
    redirect_uri:  redirectUri,
    response_type: 'token',
    scope:         scopes,
    include_granted_scopes: 'true',
  });

  res.status(200).json({ url: `https://accounts.google.com/o/oauth2/v2/auth?${params}` });
}
