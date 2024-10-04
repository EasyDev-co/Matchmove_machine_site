import styles from "./CheckOut.module.css"
import {useEffect } from "react";
import logo from "../../assets/images/logo.svg"
import Payment from "./Payment";

import { useDispatch, useSelector } from "react-redux";
import { fetchOrder } from "../../store/slices/orderSlice";

const FinishCheckout =()=>{

  const dispatch = useDispatch()
  const {order, status} = useSelector(state=> state.order)

  console.log(order);
  
  
  useEffect(()=>{
    const fetchOrderData = async () => {
      try {
        await dispatch(fetchOrder()).unwrap();
      } catch (error) {
        console.error("Failed to fetch order:", error);
      }
    };

    fetchOrderData();
  },[dispatch])

if(order){
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

          <div className={`${styles.check} h5-light`}>
            <div className={styles.checkField}>
              <p>Subtotal: </p> <p>${order.total_price}</p>
            </div>
            <div className={styles.checkField}></div>
            <div className={`${styles.checkField} ${styles.total} h4-medium`}>
              <p>Total: </p> <p>${order.total_price}</p>
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

export default FinishCheckout