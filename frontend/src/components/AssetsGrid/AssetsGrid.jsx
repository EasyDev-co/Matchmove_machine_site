import Asset from "./Asset";
import Pagination from "../Pagination/Pagination";
import styles from "./Assets.module.css"

const AssetsGrid =({items, pagination})=>{
    return (
      <div>
        <Pagination pagination={pagination} />
        <div className={styles.container}>
          {items.map((item) => <Asset key={item.id} asset={item}/>)}
        </div>
        <Pagination  pagination={pagination}/>
      </div>
    );
}

export default AssetsGrid