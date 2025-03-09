// src/components/FacebookOAuth.jsx
import React from 'react';

const FacebookOAuth = ({ name, icon }) => {
  const FACEBOOK_CLIENT_ID = '1180937586941613';
  const FACEBOOK_REDIRECT_URI = 'https://grids.matchmovemachine.com/facebook/oauth/callback/';

  const handleFacebookLogin = () => {
    const baseUrl = 'https://www.facebook.com/v12.0/dialog/oauth';
    const scope = 'email'; // Запрашиваемые разрешения
    const params = new URLSearchParams({
      client_id: FACEBOOK_CLIENT_ID,
      redirect_uri: FACEBOOK_REDIRECT_URI,
      response_type: 'code',
      scope: scope,
    });

    window.location.href = `${baseUrl}?${params.toString()}`;
  };

  return (
    <div>
      <button className='auth-button' onClick={handleFacebookLogin}>
        {icon} {name}
      </button>
    </div>
  );
};

export default FacebookOAuth;