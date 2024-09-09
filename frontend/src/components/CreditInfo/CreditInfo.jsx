import styles from "./CreditInfo.module.css";
import CreditCardForm from "./CreditForm";
import { paypalIconsvg, gPaysvg, applePaysvg } from "../../assets/svg/svgimages";

const CreditInfo = () => {
  return (
    <div className={styles.wrap}>
      <div className={styles.main}>
        <div className={styles.top}>
          <div className={styles.paySystems}>
            <button className={styles.systembtn}>{paypalIconsvg}</button>
            <button className={styles.systembtn}>{gPaysvg}</button>
            <button className={styles.systembtn}>{applePaysvg}</button>
          </div>
          <div className={styles.orCard}>
            <div className={styles.line} /> <p>Or pay by card</p>
            <div className={styles.line} />
          </div>
        </div>

        <CreditCardForm />
      </div>
    </div>
  );
};

export default CreditInfo;
