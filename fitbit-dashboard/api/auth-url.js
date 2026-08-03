// api/auth-url.js
// Genera la URL de autenticación de Google OAuth2
export default function handler(req, res) {
  const clientId     = process.env.GOOGLE_CLIENT_ID;
  const redirectUri  = process.env.NEXT_PUBLIC_URL + '/callback';

  if (!clientId) {
    return res.status(500).json({ error: 'GOOGLE_CLIENT_ID no configurado en Vercel.' });
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

  const url = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
  res.status(200).json({ url });
}
