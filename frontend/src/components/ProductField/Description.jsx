import styles from "./ProductField.module.css"

const Description =({description})=>{
    return (
      <div className={styles.descriptionBlock}>
        {description?<p className="h5-light">{description}</p>:<p className="h5-light">Product has no description yet</p>}
      </div>
    );
}

export default Description