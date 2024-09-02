import Asset from "./Asset";
import Pagination from "../Pagination/Pagination";
import styles from "./Assets.module.css"

const AssetsGrid =({items})=>{
    return (
      <div>
        <Pagination />
        <div className={styles.container}>
          {items.map((item) => <Asset key={item.id} asset={item}/>)}
        </div>
        <Pagination/>
      </div>
    );
}

export default AssetsGrid