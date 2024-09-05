import styles from "./CartItems.module.css"

const Item =({item})=>{
    return <div className={styles.itemCont}>{item.title}</div>
}

export default Item