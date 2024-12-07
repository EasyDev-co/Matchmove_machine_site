import styles from "./CheckOut.module.css"
import {useEffect } from "react";
import logo from "../../assets/images/logo.svg"
import Payment from "./Payment";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";

import { useDispatch, useSelector } from "react-redux";
import { fetchOrder } from "../../store/slices/orderSlice";

const FinishCheckout =()=>{

  const dispatch = useDispatch()
  const {order, status} = useSelector(state=> state.order)
  const {profile} = useSelector(state=> state.profile)
  
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

  if(status.fetchOrderStatus === "loading"){
    return <LoadingScreen/>
  }

if(status.fetchOrderStatus === "succeeded"&&order.order.items){
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.logocont}>
          <img src={logo} alt="logo" />
        </div>
        {profile?.email &&<div className={styles.emailcont}>
          <p className={styles.email}>Email:</p>
          <p>{profile.email}</p>
        </div>}
      </div>
      <div className={styles.body}>
        <div className={styles.orderInfo}>
          <div className={`${styles.check} h5-light`}>
            
              {order.order.items.map((item)=><div key={item.id} className={styles.checkField}><p>{item.product.lens.brand} {item.product.lens.model_name}</p> <p>${item.product.price}</p></div>)}
            
            <div className={styles.checkField}></div>
            <div className={`${styles.checkField} ${styles.total} h4-medium`}>
              <p>Total: </p> <p>${order.order.total_price}</p>
            </div>
            <div className={styles.line} />
            <p className={styles.advice}>
              The price of all chosen assets includes VAT. You can apply promo
              code and complete the payment during the checkout.
            </p>
          </div>
        </div>
        <div className={styles.proceed}>
          <Payment  orderId={order.order.id} />
        </div>
      </div>
    </div>
  );
}

if(status.fetchOrderStatus === "failed"){
   return (
     <section className="width">
       <h2 className="h2-medium">Item not found or an error occurred.</h2>{" "}
       <p className="h4-medium">Please try again.</p>
     </section>
   );
}
}

export default FinishCheckout