import styles from "./NavigationTop.module.css"
import { Link } from "react-router-dom"
import { breadcrumbsvg } from "../../assets/svg/svgimages"

const NavigationTop =({title, text, singleProduct})=>{
    
    
    return (
      <section className={`height ${styles.main}`}>
        {title === "Distortion Grids Database" ? (
          <div className={styles.breadcrumbs}>
            <Link>Home {breadcrumbsvg}</Link>
            <p>Full library</p>
          </div>
        ) : singleProduct ? (
          <div className={styles.breadcrumbs}>
            <Link>Home {breadcrumbsvg}</Link>
            <Link>Full library {breadcrumbsvg}</Link>
            <Link>{singleProduct.camera.model_name} {breadcrumbsvg}</Link>
            <Link>{singleProduct.lens.brand} {singleProduct.lens.model_name} {breadcrumbsvg}</Link>
            <p>Distortion grid pack for {singleProduct.camera.model_name} {singleProduct.lens.model_name}</p>
          </div>
        ) : title === "Affiliate program" ? (
          <div className={styles.breadcrumbs}>
            <Link>Home {breadcrumbsvg}</Link>
            <p>Affiliate program</p>
          </div>
        ) : title === "FAQ" ? (
          <div className={styles.breadcrumbs}>
            <Link>Home {breadcrumbsvg}</Link>
            <p>FAQ</p>
          </div>
        ) : title === "Error" ? (
          <div className={styles.breadcrumbs}>
            <Link>Home {breadcrumbsvg}</Link>
            <p>Error</p>
          </div>
        ) : (
          "Error"
        )}
        <h2 className="h2-bold">{title} </h2>
        {text && <p className="h4-light">{text}</p>}
      </section>
    );
}

export default NavigationTop