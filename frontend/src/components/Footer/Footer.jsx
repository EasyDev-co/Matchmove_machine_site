
import styles from "./Footer.module.css"
import logo from "../../assets/images/logo.svg"
import { visaIcon, masercardIcon, paypalIcon, americanExpressIcon, googlePayIcon, applePay } from "../../assets/svg/paymenticons";
import { facebook, vimeo, instagram, linkedin, youtube } from "../../assets/svg/footerbtnhs";

const Footer = () => {
    return (
      <footer className={styles.container}>
        <div className={styles.content}>
          <div className={styles.logoCont}>
            <img src={logo} alt="footer-logo" />
          </div>

          <div className={styles.menu}>
            <div className={styles.column}>
              <p className="h5-extra-bold">Menu</p>
              <ul>
                <li>Full library</li>
                <li>How it works</li>
                <li>Affiliate program</li>
                <li>Tutorials</li>
                <li>Guide</li>
                <li>Magnetic grid</li>
                <li>FAQ</li>
              </ul>
            </div>
          </div>

          <div className={styles.line}>
            <div className={styles.lineCont} />
          </div>

          <div className={styles.wrap}>
            <div className={styles.links}>
              <div className={styles.column}>
                <p className="h5-extra-bold">Links</p>
                <ul>
                  <li>Privacy policy</li>
                  <li>Terms of use</li>
                  <li>Our studio</li>
                </ul>
              </div>
            </div>

            <div className={styles.line}>
              <div className={styles.lineCont} />
            </div>

            <div className={styles.payments}>
              <div className={styles.column}>
                <p className="h5-extra-bold">Payments</p>
                <ul>
                  <li>
                    <button>{visaIcon}</button>
                  </li>
                  <li>
                    <button>{masercardIcon}</button>
                  </li>
                  <li>
                    <button>{paypalIcon}</button>
                  </li>
                  <li>
                    <button>{americanExpressIcon}</button>
                  </li>
                  <li>
                    <button>{googlePayIcon}</button>
                  </li>
                  <li>
                    <button>{applePay}</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className={styles.line}>
            <div className={styles.lineCont} />
          </div>

          <div className={styles.item}>
            <div className={styles.contacts}>
              <div className={styles.column}>
                <p className="h5-extra-bold">Contacts</p>
                <ul>
                  <li>
                    <button>{facebook}</button>
                  </li>
                  <li>
                    <button>{vimeo}</button>
                  </li>
                  <li>
                    <button>{instagram}</button>
                  </li>
                  <li>
                    <button>{linkedin}</button>
                  </li>
                  <li>
                    <button>{youtube}</button>
                  </li>
                </ul>
              </div>

              <div className={styles.email}>
              <p className="h5-extra-bold">Email</p>
              <p>grids@matchmovemachine.com</p>
            </div>
            </div>
          </div>
        </div>
        <p className="h2-light">&copy; Matchmove machine, 2024</p>

      </footer>
    );
  };
  
  export default Footer