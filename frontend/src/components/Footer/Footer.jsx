
import styles from "./Footer.module.css"
import logo from "../../assets/images/logo.svg"

const Footer = () => {
    return (
      <footer className={styles.container}>
        <div className={styles.content}>
          <div className={styles.logoCont}><img src={logo} alt="footer-logo" /></div>

          <div className={styles.list}>
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

          <div className={styles.wrap}>
            <div className={styles.list}>
              <p className="h5-extra-bold">Links</p>
              <ul>
                <li>Privacy policy</li>
                <li>Terms of use</li>
                <li>Our studio</li>
              </ul>
            </div>
            <div className={styles.list}>
              <p className="h5-extra-bold">Payments</p>
            </div>
          </div>

          <div className={``}>
            <div className={styles.list}>
              <p className="h5-extra-bold">Contacts</p>
            </div>

            <div className={styles.list}>
              <p className="h5-extra-bold">Email</p>
            </div>
          </div>
        </div>
        <p className="h2-light">&copy; Matchmove machine, 2024</p>

      </footer>
    );
  };
  
  export default Footer