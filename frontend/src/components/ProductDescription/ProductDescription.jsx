import styles from "./ProductDescription.module.css"
import Button from "../Button"
import { companysvg } from "../../assets/svg/svgimages";

import { useDispatch } from "react-redux";
import { postCartItem } from "../../store/slices/cartItemSlice";
import { downloadProductFile } from "../../store/slices/singleProductSlice";

const ProductDescription =({singleProduct})=>{

  const dispatch = useDispatch()

  const addToCart =()=>{
    dispatch(postCartItem(singleProduct.id))
  }

  const downloadAsset = ()=>{
    dispatch(downloadProductFile(singleProduct.id))
  }

    return (
      <section className="height" id="description">
        <div className={styles.main}>
          <div className={styles.infoCont}>
            <h2 className="h2-medium">Price</h2>
            <div className={styles.pricecont}>
              <div className={styles.priceBtn}>
                <Button
                  variant="blue"
                  label={`${singleProduct.price}$`}
                  iconType="cart"
                  onClick={addToCart}
                />
              </div>
              <div className={styles.priceBtn}>
                <Button
                  label="FREE ASSET"
                  iconType="download"
                  variant="outline-blue"
                  onClick={downloadAsset}
                />
              </div>
              <p>
                File size: <span className={styles.assetSize}>126 MB</span>
              </p>
              <a href="/">See all options</a>
            </div>
          </div>

          <div className={styles.container}>
            <h2 className="h2-medium">Author</h2>
            {singleProduct.author.username ? (
              <a href="/" className={styles.authorInfo}>
                {singleProduct.author.username }
              </a>
            ) : (
              <a href="/" className={styles.authorInfo}>
                {companysvg} Matchmove machine
              </a>
            )}
          </div>

          <div className={`${styles.container} ${styles.license}`}>
            <h2 className="h2-medium">License</h2>
            <p className={styles.assetSize}>
              Need a license for the studio? We're happy to offer a tailored
              pricing plan. Get in touch with our manager to acquire the
              necessary asset for your studio.
            </p>
            <a href="/">Contact us</a>
          </div>
        </div>
      </section>
    );
}

export default ProductDescription