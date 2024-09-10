import CartItems from "../CartItems/CartItems"
import { useState, useEffect } from "react"
import Button from "../Button"
import { useNavigate } from "react-router-dom"

import styles from "./CartPopUp.module.css"

const CartPopUp = ({ closeCart }) => {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  const handleCheckOut = () => {
    navigate("checkout");
    handleClose();
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    if (!isVisible) {
      const timer = setTimeout(() => {
        closeCart(); // Call the parent closeCart function after animation
      }, 400); // Match this duration with your exit animation duration

      return () => clearTimeout(timer);
    }
  }, [isVisible, closeCart]);

  return (
    <div className={styles.fixWrap}>
      <div className={`${styles.main} ${!isVisible ? styles.exit : ''}`}>
        <div className={styles.navigation}>
          <h3 className="h3-medium">Cart</h3>
          <div className={styles.closeBtn}>
            <Button
              variant="transparent"
              iconType="crossbtn"
              onClick={handleClose}
            />
          </div>
        </div>
        <CartItems />
        <div className={styles.checkoutField}>
          <div className={styles.checkInfo}>
            <h4 className="h4-medium">Total</h4>
            <h4 className="h4-medium">$625.00</h4>
          </div>
          <Button
            label="Checkout"
            variant="blue"
            iconType="arrowRight"
            onClick={handleCheckOut}
          />
        </div>
      </div>
    </div>
  );
};

export default CartPopUp;