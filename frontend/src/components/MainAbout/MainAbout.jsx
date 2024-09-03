import styles from "./MainAbout.module.css"
import image from "../../assets/images/about.png"

const MainAbout =()=>{
    return (
      <section className={`height ${styles.main}`}>
        <div className={styles.content}>
          <h2 className="h2-bold">About</h2>
          <p className="h4-medium">
            High-quality <span>filming of distortion grids</span> requires 1-3 hours of work
            by a film crew and expensive rental equipment. Grids remain in
            project archives and are not reused, or artists do not have time to
            receive them before tracking begins, and they spend a lot of time
            setting up the lens.
          </p>

          <p className="h4-medium">
            Facing these challenges while producing camera tracking for our
            clients, we have <span>collected popular combinations</span> of camera models and
            lenses, as well as rare assets added weekly thanks to the support of
            the global community.
          </p>

          <p className="h4-medium">
            Save your time and your clients’ budget, and be sure of <span className={styles.blue}>quality!</span>
          </p>
        </div>
        <div className={styles.imgcont}>
          <img src={image} alt="about" />
        </div>
      </section>
    );
}

export default MainAbout