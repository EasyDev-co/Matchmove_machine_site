import styles from "./NavigationTop.module.css"
import { Link } from "react-router-dom"
import { breadcrumbsvg } from "../../assets/svg/svgimages"

const NavigationTop =()=>{
    return(
        <section className={`height ${styles.main}`}>
            <div className={styles.breadcrumbs}>
                <Link>Home {breadcrumbsvg}</Link>
                <p>Full library</p>
            </div>
            <h2 className="h2-bold">Distortion Grids Database </h2>
            <p className="h4-light">Search for available distortion grids for chosen camera and lens models.</p>
        </section>
    )
}

export default NavigationTop