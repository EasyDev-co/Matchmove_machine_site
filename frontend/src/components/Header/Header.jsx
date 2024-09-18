import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css"
import Button from "../Button";
import logo from "../../assets/images/logo.svg"
import mobilelogo from "../../assets/images/mobilelogo.svg"
import HeaderLinks from "./HeaderLinks";
import User from "./HeaderUser";
import CartPopUp from "../CartPopUp/CartPopUp";

import { useSelector } from "react-redux";

const Header = () => {

  const navigate = useNavigate()

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showCart, setShowCart] = useState(false)

  const {isAuthenticated} = useSelector(state=> state.user)

  const openCart =()=>{
    setShowCart(prev=>!prev)
  }
  const closeCart =()=>{
    setShowCart(false)
  }

  const handkeGoToMainPage =()=>{
    navigate("/")
  }

  const handleCloseMenu =()=>{
    setIsMenuOpen(false)
    
  }

  return (
    <header className={styles.main}>
      <div className={styles.container}>
        <div className={styles.logocont} onClick={handkeGoToMainPage}><img src={logo} alt="logo" /></div>
        <div className={styles.logo}><img src={mobilelogo} alt="m-logo" /></div>
        <HeaderLinks isMenuOpen={isMenuOpen} handleCloseMenu={handleCloseMenu}/>
        <div className={styles.btncont}>
          <div><Button labelPosition="none" variant={window.innerWidth>1000? "transparent": "grey"} color="white" iconType="cart" onClick={openCart} /></div>
          <div>{isAuthenticated?<User/>: <div className={styles.signInbtn}><Button label="Sign In" variant="blue" iconType="person" labelPosition={window.innerWidth>1000? "left": "none"} /></div>}</div>
          <div className={styles.mobilebtn}><Button labelPosition="none" variant="grey" iconType="headerMenu" onClick={()=>setIsMenuOpen(prev=>!prev)} /></div>
        </div>
      </div>
      {showCart && <CartPopUp closeCart={closeCart}/>}
    </header>
  );
};
  
  export default Header;