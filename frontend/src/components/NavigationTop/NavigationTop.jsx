import styles from "./NavigationTop.module.css"
import { Link } from "react-router-dom"
import { breadcrumbsvg } from "../../assets/svg/svgimages"

const NavigationTop =({title, text, singleProduct, singleTutorial})=>{
    
    
    return (
      <section className={`height ${styles.main}`}>
        {title === "Distortion Grids Database" ? (
          <div className={styles.breadcrumbs}>
            <Link  to="/">Home {breadcrumbsvg}</Link>
            <p>Full library</p>
          </div>
        ) : singleProduct ? (
          <div className={styles.breadcrumbs}>
            <Link to="/">Home {breadcrumbsvg}</Link>
            <Link to="/library?page=1&page_size=24">Full library {breadcrumbsvg}</Link>
            <Link to={`/library?page=1&page_size=24&camera=${singleProduct.camera.id}`}>{singleProduct.camera.model_name} {breadcrumbsvg}</Link>
            <Link to={`/library?page=1&page_size=24&lens=${singleProduct.lens.id}`}>{singleProduct.lens.brand} {singleProduct.lens.model_name} {breadcrumbsvg}</Link>
            <p>Distortion grid pack for {singleProduct.camera.model_name} {singleProduct.lens.model_name}</p>
          </div>
        ) : singleTutorial ? (
          <div className={styles.breadcrumbs}>
            <Link to="/">Home {breadcrumbsvg}</Link>
            <Link to="/tutorials">Tutorials {breadcrumbsvg}</Link>
            <p>{singleTutorial}</p>
          </div>
        ) : title === "Affiliate program" ? (
          <div className={styles.breadcrumbs}>
            <Link  to="/">Home {breadcrumbsvg}</Link>
            <p>Affiliate program</p>
          </div>
        ) : title === "FAQ" ? (
          <div className={styles.breadcrumbs}>
            <Link to="/">Home {breadcrumbsvg}</Link>
            <p>FAQ</p>
          </div>
        ) : title === "Top Contribution" ? (
          <div className={styles.breadcrumbs}>
            <Link to="/">Home {breadcrumbsvg}</Link>
            <p>Top Contribution</p>
          </div>
        ) : title === "Tutorials" ? (
          <div className={styles.breadcrumbs}>
            <Link to="/">Home {breadcrumbsvg}</Link>
            <p>Tutorials</p>
          </div>
        )  
        : title === "How it works" ?(
          <div className={styles.breadcrumbs}>
          <Link to="/">Home {breadcrumbsvg}</Link>
          <p>How it works</p>
        </div>
        ) : title === "Error" ? (
          <div className={styles.breadcrumbs}>
            <Link  to="/" >Home {breadcrumbsvg}</Link>
            <p>Error</p>
          </div>
        ) : (
          "Error"
        )}
        <h2 className="h2-bold">{title} </h2>
        {text && <p className={`h4-light ${styles.text}`}>{text}</p>}
      </section>
    );
}

export default NavigationTop