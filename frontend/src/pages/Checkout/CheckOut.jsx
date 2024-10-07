import styles from "./CheckOut.module.css"
import { useState, useEffect } from "react";
import CartItems from "../../components/CartItems/CartItems";
import Button from "../../components/Button";
import logo from "../../assets/images/logo.svg"
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../store/slices/cartSlice";
import { createOrder } from "../../store/slices/orderSlice";

const CheckOut =()=>{

  const [ordererror, setOrderError] = useState(null)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {cart, fetchCartStatus} = useSelector(state=> state.cart)
  const {profile} = useSelector(state=> state.profile)

  const navigateMainPage = ()=>{
    console.log("clicked");
    
    navigate("/")
  }

  const handleProceed = async () => {
    try {
      await dispatch(createOrder()).unwrap();
      navigate('/checkout/payment');
    } catch (error) {
      setOrderError("Something went wrong, please try again")
      console.error('Order creation failed:', error);
    }
  };
  useEffect(()=>{
    const fetchOrderData = async () => {
      try {
        await dispatch(fetchCart()).unwrap();
      } catch (error) {
        console.error("Failed to fetch order:", error);
      }
    };

    fetchOrderData();
  },[dispatch])

  if(fetchCartStatus==="loading"){
    return <LoadingScreen/>
  }

  if(fetchCartStatus==="failed"){
    return(
      <section className="width">
        <h2 className="h2-medium">An error occurred</h2>
        <p className="h4-medium">Please refresh or try again later. If the issue persists, contact support.</p>
      </section>
    )
  }

if(cart.items.length>0){
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.logocont} onClick={navigateMainPage}>
          <img src={logo} alt="logo" />
        </div>
        {profile.email&&<div className={styles.emailcont}>
          <p className={styles.email}>Email:</p>
          <p>{profile.email}</p>
        </div>}
      </div>
      <div className={styles.body}>
        <div className={styles.orderInfo}>
          {cart.items.length > 0 && (
            <div className={`${styles.cart}`}>
              <CartItems cart={cart.items} />
            </div>
          )}
        </div>
        <div className={styles.proceed}>
        <div className={`${styles.check} h5-light`}>
            <div className={styles.checkField}>
              <p>Subtotal: </p> <p>${cart.total_price}</p>
            </div>
            <div className={styles.checkField}></div>
            <div className={`${styles.checkField} ${styles.total} h4-medium`}>
              <p>Total: </p> <p>${cart.total_price}</p>
            </div>
            <div className={styles.line} />
            <p className={styles.advice}>
              The price of all chosen assets includes VAT. You can apply promo
              code and complete the payment during the checkout.
            </p>
          </div>
          <Button
            variant={"blue"}
            label={"Proceed"}
            iconType="arrowRight"
            onClick={handleProceed}
          />
        </div>
      </div>
    </div>
  );
}
if(cart.items.length<=0){
  return <section className="width">
  <h2 className="h2-medium">Your cart is empty or an error occurred</h2>
  <p className="h4-medium">Please add items to your cart and try again. If the issue persists, contact support.</p>
</section>
}
}

export default CheckOut