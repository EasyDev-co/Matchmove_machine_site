import styles from "./CartItems.module.css"
import Item from "./Item"

const CartItems =({cart})=>{

if (cart.length>0) {
    return <div className={styles.container}>
    {cart.map((item)=><Item key={item.id} item={item}/>)}
</div>
}else{
    return <p className="h4-medium">Your cart is empty.</p>
}
}

export default CartItems