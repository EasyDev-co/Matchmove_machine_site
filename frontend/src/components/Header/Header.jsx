import { useState } from "react";
import styles from "./Header.module.css"
import Button from "../Button";
import logo from "../../assets/images/logo.svg"
import mobilelogo from "../../assets/images/mobilelogo.svg"
import HeaderLinks from "./HeaderLinks";

const Header = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className={styles.main}>
      <div className={styles.container}>
        <div className={styles.logocont}><img src={logo} alt="logo" /></div>
        <div className={styles.logo}><img src={mobilelogo} alt="m-logo" /></div>
        <HeaderLinks isMenuOpen={isMenuOpen}/>
        <div className={styles.btncont}>
          <div><Button labelPosition="none" variant="grey" iconType="person" /></div>
          <div><Button label="Sign In" variant="blue" iconType="person" /></div>
          <div className={styles.mobilebtn}><Button labelPosition="none" variant="grey" iconType="person" onClick={()=>setIsMenuOpen(prev=>!prev)} /></div>
        </div>
      </div>
    </header>
  );
};
  
  export default Header;