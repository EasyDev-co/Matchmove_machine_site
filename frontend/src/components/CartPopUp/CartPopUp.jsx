import CartItems from "../CartItems/CartItems"
import { useState, useEffect, useRef } from "react"
import Button from "../Button"

import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchCart } from "../../store/slices/cartSlice"

import styles from "./CartPopUp.module.css"

const CartPopUp = ({ closeCart }) => {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.cart);

  console.log(cart);
  
  const dispatch = useDispatch();
  const popUpRef = useRef(null); // Create a ref for the main popup

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

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
        closeCart();
      }, 400);

      return () => clearTimeout(timer);
    }
  }, [isVisible, closeCart]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popUpRef.current && !popUpRef.current.contains(event.target)) {
        setIsVisible(false); // Set isVisible to false when clicked outside
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Cleanup 
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (cart.items) {
    return (
      <div className={styles.fixWrap}>
        <div
          className={`${styles.main} ${!isVisible ? styles.exit : ""}`}
          ref={popUpRef}
        >
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
          <CartItems cart={cart.items} />
          <div className={styles.checkoutField}>
            {cart.items.length > 0 && (
              <div className={styles.checkInfo}>
                <h4 className="h4-medium">Total</h4>
                <h4 className="h4-medium">${cart.total_price}</h4>
              </div>
            )}
            {cart.items.length > 0 && (
              <Button
                label="Checkout"
                variant="blue"
                iconType="arrowRight"
                onClick={handleCheckOut}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default CartPopUp;