
import styles from "./Footer.module.css"
import logo from "../../assets/images/logo.svg"
import { useNavigate } from "react-router-dom";
import { visaIcon, masercardIcon, paypalIcon, americanExpressIcon, googlePayIcon, applePay } from "../../assets/svg/paymenticons";
import { facebook, vimeo, instagram, linkedin, youtube } from "../../assets/svg/footerbtnhs";

const Footer = () => {

  const navigate = useNavigate()

  const handleLogoPath = ()=>{
    navigate("/")
  }
    return (
      <footer className={styles.container}>
        <div className={styles.content}>
          <div className={styles.logoCont}>
            <img src={logo} alt="footer-logo" onClick={handleLogoPath} />
          </div>

          <div className={styles.menu}>
            <div className={styles.column}>
              <p className="h5-extra-bold">Menu</p>
              <ul>
                <li><a href="/library">Full library</a></li>
                <li><a href="/how-it-works">How it works</a></li>
                <li><a href="/affiliate-program">Affiliate program</a></li>
                <li><a href="faq">FAQ</a></li>
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
                  <li><a href="/Privacy-Policy.pdf"  target="_blank">Privacy policy</a></li>
                  <li><a href="/Terms-of-Use.pdf" target="_blank">Terms of use</a></li>
                  <li><a href="https://matchmovemachine.com/" target="_blank">Our studio</a></li>
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
                  <a href="https://www.facebook.com/matchmovemachine" target="_blank"><button>{facebook}</button> </a>
                  </li>
                  <li>
                  <a href="https://vimeo.com/matchmovemachine" target="_blank"><button>{vimeo}</button></a>
                  </li>
                  <li>
                  <a href="https://www.instagram.com/matchmovemachine" target="_blank"><button>{instagram}</button></a>
                  </li>
                  <li>
                  <a href="https://www.linkedin.com/company/matchmovemachine/" target="_blank"><button>{linkedin}</button></a>
                  </li>
                  <li>
                  <a href="https://www.youtube.com/@matchmovemachine" target="_blank"><button> {youtube}</button></a>
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