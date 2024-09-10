
import styles from "./Footer.module.css"

const Footer = () => {
    return (
      <footer className={styles.container}>
        <div className={styles.content}>
          <div></div>
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
        </div>
        <p className="h2-light">&copy; Matchmove machine, 2024</p>

      </footer>
    );
  };
  
  export default Footer