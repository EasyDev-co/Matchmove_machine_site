import { Link } from "react-router-dom";
import Button from "../Button";
import { closesvg } from "../../assets/svg/svgimages";
import linkIng from "../../assets/images/menu-link-icon.svg";

import styles from "./Header.module.css";

const HeaderLinks = ({ isMenuOpen, handleCloseMenu }) => {
  const handleClose = () => {
    handleCloseMenu();
  };
  return (
    <div className={`${styles.linkslist} ${isMenuOpen ? styles.open : ""}`}>
      <div className={styles.closebtn}>
        <div className={styles.closebtn}>
          <button onClick={handleClose}>{closesvg}</button>
        </div>
      </div>
      <h2 className={`h2-bold ${styles.menuTitle}`}>Menu</h2>
      <ul>
        <li>
          <Link to="library" onClick={handleClose}>
            {" "}
            <img src={linkIng} alt="btn-icon" />
            Full library
          </Link>
        </li>
        <li>
          <Link to="how-it-works">
            {" "}
            <img src={linkIng} alt="btn-icon" />
            How it works
          </Link>
        </li>
        <li onClick={handleClose}>
          <Link to="/affiliate-program">
            {" "}
            <img src={linkIng} alt="btn-icon" />
            Affiliate program
          </Link>
        </li>
        <li>
          <Link to="/faq" onClick={handleClose}>
            {" "}
            <img src={linkIng} alt="btn-icon" />
            FAQ
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default HeaderLinks;
