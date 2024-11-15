import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import Button from "../Button";
import logo from "../../assets/images/logo.svg";
import mobilelogo from "../../assets/images/mobilelogo.svg";
import HeaderLinks from "./HeaderLinks";
import User from "./HeaderUser";
import CartPopUp from "../CartPopUp/CartPopUp";

import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile } from "../../store/slices/profileSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const { isAuthenticated } = useSelector((state) => state.user);
  const { profile } = useSelector((state) => state.profile);

  const openCart = () => {
    setShowCart((prev) => !prev);
  };
  const closeCart = () => {
    setShowCart(false);
  };

  const handkeGoToMainPage = () => {
    navigate("/");
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  const handleSignIn = () => {
    navigate("/authorization");
  };

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <header className={styles.main}>
      <div className={styles.container}>
        <div className={styles.logocont} onClick={handkeGoToMainPage}>
          <img src={logo} alt="logo" />
        </div>
        <div className={styles.logo} onClick={handkeGoToMainPage}>
          <img src={mobilelogo} alt="m-logo" />
        </div>
        <HeaderLinks
          isMenuOpen={isMenuOpen}
          handleCloseMenu={handleCloseMenu}
        />
        <div className={styles.btncont}>
          <div>
            <Button
              labelPosition="none"
              variant={window.innerWidth > 1000 ? "transparent" : "grey"}
              color="white"
              iconType="cart"
              onClick={openCart}
            />
          </div>
          <div>
            {isAuthenticated ? (
              <User user={profile} />
            ) : (
              <div className={styles.signInbtn}>
                <Button
                  label="Sign In"
                  variant="blue"
                  iconType="person"
                  labelPosition={window.innerWidth > 1000 ? "left" : "none"}
                  onClick={handleSignIn}
                />
              </div>
            )}
          </div>
          <div className={styles.mobilebtn}>
            <Button
              labelPosition="none"
              variant="grey"
              iconType="headerMenu"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            />
          </div>
        </div>
      </div>
      {showCart && <CartPopUp closeCart={closeCart} />}
    </header>
  );
};

export default Header;
