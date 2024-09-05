import styles from "./ProductDescription.module.css"
import Button from "../Button"

const ProductDescription =()=>{
    return (
      <section className="height" id="description">
        <div className={styles.main}>
          <div>
            <h2 className="h2-medium">Price</h2>
            <div className={styles.pricecont}>
              <div className={styles.priceBtn}>
                <Button />
              </div>
              <div className={styles.priceBtn}>
                <Button />
              </div>
              <p>File size</p>
              <p>See all options</p>
            </div>
          </div>

          <div className={styles.container}>
            <h2 className="h2-medium">Author</h2>
            <p>Matchmove machine</p>
          </div>

          <div className={`${styles.container} ${styles.license}`}>
            <h2 className="h2-medium">License</h2>
            <p>
              Need a license for the studio? We're happy to offer a tailored
              pricing plan. Get in touch with our manager to acquire the
              necessary asset for your studio.
            </p>
          </div>
        </div>
      </section>
    );
}

export default ProductDescription