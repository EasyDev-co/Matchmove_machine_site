// src/components/LoginPage.jsx
import React from 'react';
// import { GOOGLE_CLIENT_ID, GOOGLE_REDIRECT_URI } from '../config';

const Oauth = () => {
    const GOOGLE_CLIENT_ID = '723039007874-1f5fgudgr46vl81old3h5qndhoihai0i.apps.googleusercontent.com'
    const GOOGLE_REDIRECT_URI = 'https://grids.matchmovemachine.com/google/oauth/callback/'
  const handleGoogleLogin = () => {
    const baseUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const scope = 'openid email profile';
    const params = new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      redirect_uri: GOOGLE_REDIRECT_URI,
      response_type: 'code',
      scope: scope,
      access_type: 'offline',  // чтобы получить refresh_token
      prompt: 'consent',       // чтобы каждый раз предлагалось выбрать аккаунт
    });

    window.location.href = `${baseUrl}?${params.toString()}`;
  };

  return (
    <div>
      <button onClick={handleGoogleLogin}>Войти через Google</button>
    </div>
  );
}

export default Oauth;