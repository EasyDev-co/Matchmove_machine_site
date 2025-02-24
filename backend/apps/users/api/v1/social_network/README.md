## Для работы на фронте нужно использовать данную библиотеку:
``react-google-login``
https://www.npmjs.com/package/react-google-login
И использовать следующий код:
```import React from 'react';
import { GoogleLogin } from 'react-google-login';

const clientId = "YOUR_GOOGLE_CLIENT_ID";

function GoogleAuth() {
  const onSuccess = (response) => {
    // Здесь response.code — это authorization code, если настроить responseType="code"
    const authCode = response.code;
    fetch('http://0.0.0.0:8080/api/v1/auth/google/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: authCode }),
    })
      .then(res => res.json())
      .then(data => {
        console.log('Токены и данные пользователя:', data);
        // Сохраните access токен для дальнейшей работы с вашим API
      })
      .catch(error => console.error('Ошибка:', error));
  };

  const onFailure = (error) => {
    console.error('Ошибка Google Login:', error);
  };

  return (
    <GoogleLogin
      clientId={clientId}
      buttonText="Войти через Google"
      onSuccess={onSuccess}
      onFailure={onFailure}
      responseType="code"
      accessType="offline"
      prompt="consent"
      cookiePolicy={'single_host_origin'}
    />
  );
}

export default GoogleAuth;
```

Обратите внимание на параметры: ```responseType="code"```,
```accessType="offline"``` и ```prompt="consent"```.
Они нужны для получения authorization code и,
соответственно, доступа к refresh/access токенам.

При помощи данной библиотеки мы открываем нужную нам форму,
благодаря которой в последствии мы можем полуить code, который можем отпправит на backend,
он в свою очередь сделает нужные запросы к API гугла и зарегистрирует или авторизует пользователя
