import styles from "./ProductField.module.css"

const Description =({description})=>{
    return (
      <div className={styles.descriptionBlock}>
        <p className="h5-light">{description}</p>
      </div>
    );
}

export default Description