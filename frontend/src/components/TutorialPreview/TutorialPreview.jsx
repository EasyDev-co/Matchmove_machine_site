import styles from "./TutorialPreview.module.css"
import Button from "../Button"
import { tutorialPreview } from "../../assets/dummyData"

const TutorialPreview =()=>{
    return (
      <section className={`height ${styles.main}`}>
        <h2 className="h2-bold">Tutorials</h2>
        <div className={styles.container}>
          {tutorialPreview.map((item) => (
            <article key={item.id} className={styles.tutorial}>
              <div className={styles.topCont}>
              <div className={styles.readmorebtn}><Button variant="outline-blue" label="Read more" iconType="arrowRight"/></div>
              <div className={styles.tutorialImg}><img src={item.image} alt="tutorial" /></div>
              </div>
              <div className={styles.title}><h3 className="h3-medium">{item.title}</h3> <div><Button iconType="download"/></div></div>
              <p className="h5-light">{item.text}</p>
            </article>
          ))}
        </div>
        <div className={styles.btn}>
          <Button
            variant="outline-grey"
            label="Browse all"
            iconType="arrowRight"
          />
        </div>
      </section>
    );
}

export default TutorialPreview