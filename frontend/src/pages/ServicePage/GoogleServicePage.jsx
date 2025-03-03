import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
// import { useSearchParams } from 'react-router-dom';  // или другой способ парсинга query
// import { API_GOOGLE_AUTH_ENDPOINT } from '../config';

const GoogleServicePage = () => {
    const [searchParams] = useSearchParams();

    useEffect(() => {
      // Достаем code
      const code = searchParams.get('code');
      console.log(code)
    }, [searchParams]);
    //   if (code) {
    //     // Отправляем POST запрос к вашему Django эндпоинту
    //     fetch(API_GOOGLE_AUTH_ENDPOINT, {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({ code }),
    //     })
    //       .then(async (response) => {
    //         if (!response.ok) {
    //           // Ошибка на бекенде
    //           const errorData = await response.json();
    //           throw new Error(errorData.error || 'Произошла ошибка при авторизации');
    //         }
    //         return response.json();
    //       })
    //       .then((data) => {
    //         // data = { refresh, access, user_info: {...} }
    //         // Сохраняем токены, например в localStorage:
    //         localStorage.setItem('accessToken', data.access);
    //         localStorage.setItem('refreshToken', data.refresh);
    //         // При желании можно сохранить что-то из user_info
    //         // localStorage.setItem('userEmail', data.user_info.email);
  
    //         // После сохранения токенов можно перенаправить на защищенную страницу
    //         window.location.href = '/profile';
    //       })
    //       .catch((error) => {
    //         console.error('Ошибка авторизации:', error);
    //         alert('Авторизация не удалась');
    //       });
    //   } else {
    //     // Если code не найден – возможно, пользователь попал на этот URL без авторизации
    //     console.warn('Не найден параметр "code" в URL');
    //   }
    // }, [searchParams]);
  return (
    <div>
      <h2>Обработка авторизации через Google...</h2>
    </div>
  );
};

export default GoogleServicePage;
