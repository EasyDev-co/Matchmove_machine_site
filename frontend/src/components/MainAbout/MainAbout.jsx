import styles from "./MainAbout.module.css"

const MainAbout =()=>{
    return (
      <section className={`height ${styles.main}`}>
        <div className={styles.content}>
          <h2 className="h2-bold">About</h2>
          <p className="h4-medium">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, est
            ratione? Dolores, porro eligendi commodi et quo minima quae ipsum
            quas obcaecati sequi nostrum quibusdam iste labore vero non
            voluptatem?
          </p>
        </div>
        <div className={styles.imgcont}></div>
      </section>
    );
}

export default MainAbout