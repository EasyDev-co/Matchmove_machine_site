// src/pages/FacebookServicePage.jsx
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import BASE_URL from '../../config';
import Cookies from 'js-cookie';

const FacebookServicePage = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Достаем code
    const code = searchParams.get('code');
    console.log(code);
    if (code) {
      // Отправляем POST запрос к вашему Django эндпоинту
      fetch(`${BASE_URL}/users/v1/auth/facebook/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      })
        .then(async (response) => {
          if (!response.ok) {
            // Ошибка на бекенде
            const errorData = await response.json();
            throw new Error(errorData.error || 'Произошла ошибка при авторизации');
          }
          return response.json();
        })
        .then((data) => {
          // data = { refresh, access, user_info: {...} }
          // Сохраняем токены, например в localStorage:
          Cookies.set('access_token', data.access, { sameSite: 'Strict' });
          Cookies.set('refresh_token', data.refresh, { sameSite: 'Strict' });
          // localStorage.setItem('accessToken', data.access);
          // localStorage.setItem('refreshToken', data.refresh);
          // При желании можно сохранить что-то из user_info
          // localStorage.setItem('userEmail', data.user_info.email);

          // После сохранения токенов можно перенаправить на защищенную страницу
          window.location.href = '/profile';
        })
        .catch((error) => {
          console.error('Ошибка авторизации:', error);
          alert('Авторизация не удалась');
        });
    } else {
      // Если code не найден – возможно, пользователь попал на этот URL без авторизации
      console.warn('Не найден параметр "code" в URL');
    }
  }, [searchParams]);

  return (
    <div>
      <h2>Обработка авторизации через Facebook...</h2>
    </div>
  );
};

export default FacebookServicePage;