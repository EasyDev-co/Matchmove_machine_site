import React, { useState, useEffect } from "react";
import { GoogleReCaptchaProvider, GoogleReCaptcha } from "react-google-recaptcha-v3";
import styles from "./ContacUs.module.css";
import arrowbtn from "../../assets/svg/arrowbtn.svg";

const ContacUs = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [captchaToken, setCaptchaToken] = useState(null); // Токен reCAPTCHA
  const [score, setScore] = useState(null); // Оценка reCAPTCHA

  // Обработчик изменения токена reCAPTCHA
  // const handleVerify = (token) => {
  //   setCaptchaToken(token);
  //   console.log("Captcha Token:", token);
  // };

  // Обработчик отправки формы
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // Проверка наличия токена
  //   if (!captchaToken) {
  //     alert("Пожалуйста, подождите, пока reCAPTCHA загрузится.");
  //     return;
  //   }

  //   // Отправка данных на сервер
  //   try {
  //     const response = await fetch("/your-server-endpoint", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         email,
  //         message,
  //         captchaToken,
  //       }),
  //     });

  //     const result = await response.json();
  //     console.log("Server Response:", result);

  //     // Проверка оценки reCAPTCHA
  //     if (result.score) {
  //       setScore(result.score);
  //       if (result.score < 0.5) {
  //         alert("Ваш запрос выглядит подозрительно. Пожалуйста, попробуйте снова.");
  //       } else {
  //         alert("Форма успешно отправлена!");
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Ошибка при отправке формы:", error);
  //   }
  // };

  return (
    // <GoogleReCaptchaProvider reCaptchaKey="6Lch9OcqAAAAAE2dMEu69YahTitEpt1ON28Mymgo">
      <div className={styles.block}>
        <h2 className={styles.title}>We’d love to hear from you!</h2>
        <p className={styles.text}>
          Have feedback, a question, or just want to get in touch? Let us know by
          filling out the form below.
        </p>
        {/* <form onSubmit={handleSubmit} className={styles.form_container}> */}
        <form className={styles.form_container}> 
          <div className={styles.form_group}>
            <input
              type="email"
              id="email"
              placeholder="E-mail"
              className={styles.form_input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.form_group}>
            <textarea
              id="message"
              placeholder="Didn't find what you needed? Have an idea or suggestion? Just want to say hi?"
              className={`${styles.form_input} ${styles.textarea_field}`}
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>

          {/* Компонент reCAPTCHA v3 */}
          {/* <GoogleReCaptcha onVerify={handleVerify} /> */}

          <button type="submit" className={styles.submit_button}>
            <p>Submit</p>
            <img style={{ opacity: "1" }} src={arrowbtn} alt="arrow"></img>
          </button>
        </form>

        {/* Отображение оценки reCAPTCHA (опционально) */}
        {/* {score && <p>Оценка reCAPTCHA: {score}</p>} */}
      </div>
    // </GoogleReCaptchaProvider>
  );
};

export default ContacUs;

// import styles from "./ContacUs.module.css";
// import Modal from "../Modal/Modal";
// import { useState } from "react";
// import arrowbtn from "../../assets/svg/arrowbtn.svg";
// import ReCAPTCHA from "react-google-recaptcha";

// const ContacUs = () => {
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const [captchaValue, setCaptchaValue] = useState(null); // Состояние для хранения токена капчи

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!captchaValue) {
//       alert("Пожалуйста, подтвердите, что вы не робот.");
//       return;
//     }
//     console.log({ email, message, captchaValue });
//     // Здесь можно добавить логику отправки данных
//   };
//   const handleCaptchaChange = (value) => {
//     setCaptchaValue(value);
//   };
  
//   return (
//     <div className={styles.block}>
//       <h2 className={styles.title}>We’d love to hear from you!</h2>
//       <p className={styles.text}>
//         Have feedback, a question, or just want to get in touch? Let us know by
//         filling out the form below.
//       </p>
//       <form onSubmit={handleSubmit} className={styles.form_container}>
//       <div className={styles.form_group}>
//         <input
//           type="email"
//           id="email"
//           placeholder="E-mail"
//           className={styles.form_input}
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//       </div>
//       <div className={styles.form_group}>
//         <textarea
//           id="message"
//           placeholder="Didn't find what you needed? Have an idea or suggestion? Just want to say hi?"
//           className={`${styles.form_input} ${styles.textarea_field}`}
//           rows="4"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         ></textarea>
//       </div>
//       <ReCAPTCHA
//           sitekey="6Lch9OcqAAAAAE2dMEu69YahTitEpt1ON28Mymgo" // Замените на ваш Site Key
//           onChange={handleCaptchaChange}
//           // className={styles.captcha}
//         />
//       <button type="submit" className={styles.submit_button}>
//         <p>Submit</p>
//         <img style={{opacity: '1'}} src={arrowbtn} alt="arrow"></img>
//       </button>
//     </form>
//     </div>
//   );
// };

// export default ContacUs;
