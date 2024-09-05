import styles from "./NavigationTop.module.css"
import { Link } from "react-router-dom"
import { breadcrumbsvg } from "../../assets/svg/svgimages"

const NavigationTop =({title, text})=>{
    
    
    return(
        <section className={`height ${styles.main}`}>
            <div className={styles.breadcrumbs}>
                <Link>Home {breadcrumbsvg}</Link>
                <p>Full library</p>
            </div>
            <h2 className="h2-bold">{title} </h2>
           {text &&  <p className="h4-light">{text}</p>}
        </section>
    )
}

export default NavigationTop