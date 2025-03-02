import { Link } from "react-router-dom";
import Button from "../Button";
import { closesvg } from "../../assets/svg/svgimages";
import linkIng from "../../assets/images/menu-link-icon.svg";

import styles from "./Header.module.css";
import Modal from "../Modal/Modal";
import { useState } from "react";
import ContacUs from "../ContacUs/ContacUs";

const HeaderLinks = ({ isMenuOpen, handleCloseMenu }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const modalClose = () => {
    setIsOpen(false);
  };
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
          <Link to="https://matchmovemachine.com/howto/">
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
        <li onClick={handleClose}>
          <Link to="/tutorials">
            {" "}
            <img src={linkIng} alt="btn-icon" />
            Tutorials
          </Link>
        </li>
        <li>
          <Link to="/faq" onClick={handleClose}>
            {" "}
            <img src={linkIng} alt="btn-icon" />
            FAQ
          </Link>
        </li>
        <li>
          <button className={`${styles.contactUs}`} onClick={handleOpen}>
            {" "}
            <img className={styles.img} src={linkIng} alt="btn-icon" />
            Contact Us
          </button>
        </li>
      </ul>
      <Modal isOpen={isOpen} onClose={modalClose}>
        <ContacUs />
      </Modal>
    </div>
  );
};

export default HeaderLinks;
