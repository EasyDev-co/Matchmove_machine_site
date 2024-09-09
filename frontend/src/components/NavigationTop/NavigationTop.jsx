import styles from "./NavigationTop.module.css"
import { Link } from "react-router-dom"
import { breadcrumbsvg } from "../../assets/svg/svgimages"

const NavigationTop =({title, text})=>{
    
    
    return (
      <section className={`height ${styles.main}`}>
        {title === "Distortion Grids Database" ? (
          <div className={styles.breadcrumbs}>
            <Link>Home {breadcrumbsvg}</Link>
            <p>Full library</p>
          </div>
        ) : title === "Distortion grids pack for Canon EF" ? (
          <div className={styles.breadcrumbs}>
            <Link>Home {breadcrumbsvg}</Link>
            <Link>Full library {breadcrumbsvg}</Link>
            <Link>ARRI ALEXA 65 {breadcrumbsvg}</Link>
            <Link>Canon {breadcrumbsvg}</Link>
            <Link>Canon EF 100-200mm f/4.5A {breadcrumbsvg}</Link>
            <p>Distortion grid pack for Canon EF</p>
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
        ) : (
          ""
        )}
        <h2 className="h2-bold">{title} </h2>
        {text && <p className="h4-light">{text}</p>}
      </section>
    );
}

export default NavigationTop