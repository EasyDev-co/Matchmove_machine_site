import styles from "./CheckOut.module.css"
import CreditInfo from "../../components/CreditInfo/CreditInfo"
import CartItems from "../../components/CartItems/CartItems";
import Button from "../../components/Button";

const CheckOut =()=>{
    return (
      <div className={styles.main}>
        <div className={styles.header}>
          <div>logo</div>
          <div className={styles.emailcont}>
            <p>Email:</p>
            <p>grids@matchmovemachine.com</p>
          </div>
        </div>
        <div className={styles.body}>
          <CreditInfo />
          <div className={styles.orderInfo}>
            <div className={styles.cart}>
              <CartItems />
            </div>

            <div className={styles.check}>
              <div className={styles.checkField}>
                <p>Subtotal: </p> <p>$625.00</p>
              </div>
              <div className={styles.checkField}>
                <p>Promocode: </p> <p>$0.00</p>
              </div>
              <div  className={styles.checkField}>
                <p>Total: </p> <p>$625.00</p>
              </div>

              <p>
                The price of all chosen assets includes VAT. You can apply promo
                code and complete the payment during the checkout.
              </p>

              <Button variant="blue" label="Pay" iconType="arrowRight" />
            </div>
          </div>
        </div>
      </div>
    );
}

export default CheckOut