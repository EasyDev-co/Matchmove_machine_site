import { Link } from "react-router-dom"
import { closesvg } from "../../assets/svg/svgimages";

import styles from "./Header.module.css"

const HeaderLinks =({isMenuOpen, handleCloseMenu})=>{

  const handleClose =()=>{
    handleCloseMenu()
    
  }
    return (
      <div className={`${styles.linkslist} ${isMenuOpen ? styles.open : ""}`}>
        <div className={styles.closebtn}><button onClick={handleClose}>{closesvg}</button></div>
        <h2 className={`h2-bold ${styles.menuTitle}`}>Menu</h2>
        <ul >
          <li>
            <Link to="library" onClick={handleClose}>Full library</Link>
          </li>
          <li>
            <Link>How it works</Link>
          </li>
          <li onClick={handleClose}>
            <Link to="/affiliate-program">Affiliate program</Link>
          </li>
          <li>
            <Link>Tutorials</Link>
          </li>
          <li>
            <Link>Guide</Link>
          </li>
          <li>
            <Link>Magnetic grid</Link>
          </li>
          <li>
            <Link to="/faq" onClick={handleClose}>FAQ</Link>
          </li>
        </ul>
      </div>
    );
}

export default HeaderLinks