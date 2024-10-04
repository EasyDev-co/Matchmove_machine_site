import styles from "./CartItems.module.css";
import Button from "../Button";

import { deleteCartItem } from "../../store/slices/cartSlice";
import { useDispatch } from "react-redux";

const Item = ({ item }) => {

  const dispatch = useDispatch()

  const handleDeleteItem = () => {
 dispatch(deleteCartItem(item.id))

  };

  return (
    <div className={styles.itemCont}>
      <div className={styles.start}>
        <div><div className={styles.priceCont}>${item.total_price}</div></div>
        {item.product}
      </div>
      <Button
        labelPosition="none"
        variant="transparent"
        iconType="delete"
        color="red"
        onClick={handleDeleteItem}
      />
    </div>
  );
};

export default Item;
