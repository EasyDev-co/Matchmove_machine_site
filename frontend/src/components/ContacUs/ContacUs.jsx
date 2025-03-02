import styles from "./ContacUs.module.css";
import Modal from "../Modal/Modal";
import { useState } from "react";
import arrowbtn from "../../assets/svg/arrowbtn.svg";

const ContacUs = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, message });
    // Здесь можно добавить логику отправки данных
  };
  
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
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
        ></textarea>
      </div>
      <button type="submit" className={styles.submit_button}>
        <p>Submit</p>
        <img style={{opacity: '1'}} src={arrowbtn} alt="arrow"></img>
      </button>
    </form>
    </div>
  );
};

export default ContacUs;
