import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { GoogleReCaptchaProvider, GoogleReCaptcha } from "react-google-recaptcha-v3";
import { sendContactUs } from "../../store/slices/sendContactUsSlice.js";
import styles from "./ContacUs.module.css";
import arrowbtn from "../../assets/svg/arrowbtn.svg";
import { useEffect } from "react";

const ContacUs = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const dispatch = useDispatch();

  // Обработчик отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      email: email,
      text: message,
      recaptcha_token: recaptchaToken, // Добавляем токен reCAPTCHA в данные формы
    };

    dispatch(sendContactUs(formData));
  };

  // Обработчик получения токена reCAPTCHA
  const handleRecaptchaVerify = (token) => {
    setRecaptchaToken(token);
  };

  useEffect(() => {
    // Генерация токена при первом рендере
    handleRecaptchaVerify();
  }, []);

  return (
    <GoogleReCaptchaProvider reCaptchaKey="6Lch9OcqAAAAAE2dMEu69YahTitEpt1ON28Mymgo">
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

          {/* Добавляем reCAPTCHA над кнопкой отправки */}
          <GoogleReCaptcha onVerify={handleRecaptchaVerify} />

          <button
            type="submit"
            className={styles.submit_button}
          >
            <p>Submit</p>
            <img style={{ opacity: "1" }} src={arrowbtn} alt="arrow"></img>
          </button>
        </form>
      </div>
    </GoogleReCaptchaProvider>
  );
};

export default ContacUs;