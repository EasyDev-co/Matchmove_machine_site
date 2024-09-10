import styles from "./ProductBanner.module.css"
import { useState } from "react"
import img  from "../../assets/images/camera.svg"
import imgLeft  from "../../assets/images/cameraLeft.svg"
import imgRight  from "../../assets/images/cameraRight.svg"

const ProductBanner =()=>{

    const [variant, setVariant] = useState(false)

   return( <section className={styles.main}>
    <button onClick={()=>setVariant(!variant)}>SEHJJJK</button>
        <div className={styles.imgcont}>
            {variant?<img className={styles.image} src={img} alt="camera" />: <img className={styles.image} src={imgRight} alt="camera" />}
        </div>
    </section>)
}

export default ProductBanner