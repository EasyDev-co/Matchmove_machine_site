import styles from "./CartItems.module.css"
import Item from "./Item"

const items = [
    { id: 1, title: "Wireless Mouse", price: 29.99 },
    { id: 2, title: "Bluetooth Keyboard", price: 49.99 },
    { id: 3, title: "USB-C Hub", price: 19.99 },
    { id: 4, title: "Gaming Headset", price: 89.99 },
    { id: 5, title: "Laptop Stand", price: 34.99 },
    { id: 6, title: "Portable Charger", price: 24.99 },
    { id: 7, title: "External SSD 1TB", price: 129.99 },
    { id: 8, title: "Webcam 1080p", price: 59.99 },
    { id: 9, title: "Desk Lamp", price: 39.99 }
  ];

const CartItems =()=>{
    return <div className={styles.container}>
        {items.length>0? items.map((item)=><Item key={item.id} item={item}/>): <p className="h4-medium">Your cart is empty.</p>}
    </div>
}

export default CartItems