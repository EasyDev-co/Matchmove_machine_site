import CartItems from "../CartItems/CartItems"
import ModalWrap from "../Modal/ModalWrap"
import Button from "../Button"
import { useNavigate } from "react-router-dom"

import styles from "./CartPopUp.module.css"

const CartPopUp =({closeCart})=>{

  const navigate = useNavigate()

  const handleCheckOut =()=>{
    navigate("checkout")
    closeCart()
  }
    return (
      <ModalWrap>
        <div className={styles.main}>
            <div className={styles.navigation}>
                <h3 className="h3-medium">Cart</h3>
                <div className={styles.closeBtn}><Button variant="transparent" iconType="crossbtn" onClick={closeCart}/></div>
            </div>
          <CartItems />
          <div className={styles.checkoutField}>
            <div>
                <h4 className="h4-medium">Total</h4>
                <h4 className="h4-medium">$625.00</h4>
            </div>
            <Button label="Checkout" variant="blue" iconType="arrowRight" onClick={handleCheckOut}/>
          </div>
        </div>
      </ModalWrap>
    );
}

export default CartPopUp