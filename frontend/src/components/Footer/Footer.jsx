import styles from "./Footer.module.css";
import logo from "../../assets/images/logo.svg";
import { useNavigate, useLocation } from "react-router-dom";
import {
  visaIcon,
  masercardIcon,
  paypalIcon,
  americanExpressIcon,
  googlePayIcon,
  applePay,
} from "../../assets/svg/paymenticons";
import {
  facebook,
  vimeo,
  instagram,
  linkedin,
  youtube,
} from "../../assets/svg/footerbtnhs";
import Modal from "../Modal/Modal";
import { useState } from "react";
import ContacUs from "../ContacUs/ContacUs";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const [isOpen, setIsOpen] = useState(false);


  const handleLogoPath = () => {
    if (location.pathname !== "/") {
      navigate("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to the top
    }
  };
  // const handleOpen = () => {
  //   setIsOpen(true);
  // };

  // const handleClose = () => {
  //   setIsOpen(false);
  // };

  const handleEmailClick = () => {
    const recipient = "grids@matchmovemachine.com";
    window.location.href = `mailto:${recipient}`;
  };
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
              <li>
                <a href="/library">Full library</a>
              </li>
              <li>
                <a href="https://matchmovemachine.com/howto/">How it works</a>
              </li>
              <li>
                <a href="/affiliate-program">Affiliate program</a>
              </li>
              <li>
                <a href="faq">FAQ</a>
              </li>
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
                <li>
                  <a href="/privacy-policy">
                    Privacy policy
                  </a>
                </li>
                <li>
                  <a href="/terms-of-use">
                    Terms of use
                  </a>
                </li>
                <li>
                  <a href="https://matchmovemachine.com/" target="_blank">
                    Our studio
                  </a>
                </li>
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
                  <a
                    href="https://www.facebook.com/matchmovemachine"
                    target="_blank"
                  >
                    <button>{facebook}</button>{" "}
                  </a>
                </li>
                <li>
                  <a href="https://vimeo.com/matchmovemachine" target="_blank">
                    <button>{vimeo}</button>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/matchmovemachine"
                    target="_blank"
                  >
                    <button>{instagram}</button>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/company/matchmovemachine/"
                    target="_blank"
                  >
                    <button>{linkedin}</button>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/@matchmovemachine"
                    target="_blank"
                  >
                    <button> {youtube}</button>
                  </a>
                </li>
              </ul>
            </div>

            <div className={styles.email}>
              <p className="h5-extra-bold">Email</p>
              <p
                onClick={handleEmailClick}
                className={styles.highLight}
                style={{cursor: 'pointer'}}
              >
                grids@matchmovemachine.com
              </p>
            </div>
          </div>
        </div>
      </div>
      <p className="h2-light">&copy; Matchmove machine, 2024</p>
    </footer>
  );
};

export default Footer;
