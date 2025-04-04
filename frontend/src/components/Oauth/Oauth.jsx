// src/components/LoginPage.jsx
import React from 'react';
// import { GOOGLE_CLIENT_ID, GOOGLE_REDIRECT_URI } from '../config';

const Oauth = ({name, icon}) => {
    const GOOGLE_CLIENT_ID = '272087782147-9u14c424vbk5dipj50g7oa1eeuli53qc.apps.googleusercontent.com'
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
      <button className='auth-button' onClick={handleGoogleLogin}>
        {icon} {name}
      </button>
    </div>
  );
}

export default Oauth;