import { Link } from "react-router-dom"

import styles from "./Header.module.css"

const HeaderLinks =({isMenuOpen})=>{
    return (
      <div>
        <ul className={`${styles.linkslist} ${isMenuOpen ? styles.open : ""}`}>
          <li>
            <Link to="library">Full library</Link>
          </li>
          <li>
            <Link>How it works</Link>
          </li>
          <li>
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
            <Link to="/faq">FAQ</Link>
          </li>
        </ul>
      </div>
    );
}

export default HeaderLinks