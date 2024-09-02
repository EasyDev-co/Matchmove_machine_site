import styles from "./Assets.module.css"
import Button from "../Button";

const Asset = ({asset})=>{
    return (
      <article className={styles.asset}>
        <div className={styles.assetthumbnail}>
            <div><p className={styles.creator}>creator</p></div>
            <p className={styles.title}>{asset.camera} {asset.lense}</p>
            <Button label={asset.price===0? "Free": `${asset.price}$`} variant={asset.price===0? "grey": "blue"}/>
        </div>
      </article>
    );
}

export default Asset