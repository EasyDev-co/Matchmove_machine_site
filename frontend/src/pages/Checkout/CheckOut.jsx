import styles from "./CheckOut.module.css"
import { useState, useEffect } from "react";
import CartItems from "../../components/CartItems/CartItems";
import Button from "../../components/Button";
import logo from "../../assets/images/logo.svg"
import ModalWrap from "../../components/Modal/ModalWrap";
import Payment from "./Payment";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrder } from "../../store/slices/orderSlice";

const CheckOut =()=>{

  const [modal, setModal] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {cart} = useSelector(state=> state.cart)
  const {order, status} = useSelector(state=> state.order)

  console.log(order);
  
  
  useEffect(()=>{
    const fetchOrderData = async () => {
      try {
        await dispatch(fetchOrder()).unwrap();
        setModal(order.results.length>0)
      } catch (error) {
        console.error("Failed to fetch order:", error);
      }
    };

    fetchOrderData();
  },[dispatch])

if(cart.items){
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.logocont}>
          <img src={logo} alt="logo" />
        </div>
        <div className={styles.emailcont}>
          <p className={styles.email}>Email:</p>
          <p>grids@matchmovemachine.com</p>
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.orderInfo}>
          {cart.items.length > 0 && (
            <div className={`${styles.cart}`}>
              <CartItems cart={cart.items} />
            </div>
          )}

          <div className={`${styles.check} h5-light`}>
            <div className={styles.checkField}>
              <p>Subtotal: </p> <p>${order.results[0].total_price}</p>
            </div>
            <div className={styles.checkField}></div>
            <div className={`${styles.checkField} ${styles.total} h4-medium`}>
              <p>Total: </p> <p>${order.results[0].total_price}</p>
            </div>
            <div className={styles.line} />
            <p className={styles.advice}>
              The price of all chosen assets includes VAT. You can apply promo
              code and complete the payment during the checkout.
            </p>
          </div>
        </div>
        <div className={styles.proceed}>
          <Payment />
        </div>
      </div>
    </div>
  );
}
}

export default CheckOut