import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { GoogleReCaptchaProvider, GoogleReCaptcha } from "react-google-recaptcha-v3";
import { sendContactUs } from "../../store/slices/sendContactUsSlice.js";
import styles from "./ContacUs.module.css";
import arrowbtn from "../../assets/svg/arrowbtn.svg";

const ContacUs = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState(""); // Токен reCAPTCHA
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false); // Флаг проверки капчи
  const dispatch = useDispatch();

  // Обработчик для получения токена reCAPTCHA
  // const handleVerify = (recaptchaToken) => {
  //   setToken(recaptchaToken);
  //   setIsCaptchaVerified(true); // Капча пройдена
  // };

  // Обработчик отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();

    // if (!isCaptchaVerified) {
    //   alert("Please verify that you are not a robot.");
    //   return;
    // }

    const formData = {
      email: email,
      text: message,
      // recaptchaToken: token, // Добавляем токен reCAPTCHA в данные формы
    };

    dispatch(sendContactUs(formData));
  };

  return (
    // <GoogleReCaptchaProvider reCaptchaKey="6Lch9OcqAAAAAE2dMEu69YahTitEpt1ON28Mymgo"> {/* Замените на ваш ключ */}
      <div className={styles.block}>
        <h2 className={styles.title}>We’d love to hear from you!</h2>
        <p className={styles.text}>
          Have feedback, a question, or just want to get in touch? Let us know by
          filling out the form below.
        </p>
        <form onSubmit={handleSubmit} className={styles.form_container}>
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
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>

          {/* reCAPTCHA v3 */}
          {/* <GoogleReCaptcha onVerify={handleVerify} /> */}

          <button
            type="submit"
            className={styles.submit_button}
            // disabled={!isCaptchaVerified} // Блокируем кнопку, если капча не пройдена
          >
            <p>Submit</p>
            <img style={{ opacity: "1" }} src={arrowbtn} alt="arrow"></img>
          </button>
        </form>
      </div>
    // </GoogleReCaptchaProvider>
  );
};

export default ContacUs;