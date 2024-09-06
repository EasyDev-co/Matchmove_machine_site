import styles from "./CartItems.module.css";
import Button from "../Button";

const Item = ({ item }) => {
  return (
    <div className={styles.itemCont}>
      <div className={styles.start}>
        <div className={styles.priceCont}>${item.price}</div>
        {item.title}
      </div>
      <Button
        labelPosition="none"
        variant="transparent"
        iconType="delete"
        color="red"
      />
    </div>
  );
};

export default Item;
