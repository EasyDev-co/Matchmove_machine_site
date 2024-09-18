import styles from "./AboutAuthor.module.css"
import { quotesvg } from "../../assets/svg/svgimages"

const AboutAuthor =({about})=>{
    return (
      <section className={styles.container}>
        <div className={styles.content}>
          <div className={styles.contentWrap}>
            <div className={styles.quotes}>
                <div>{quotesvg}</div>
                <h3 className="h3-medium">About author</h3>
            </div>
            <div className={styles.about}>
              <p>
               {about}
              </p>
            </div>
          </div>
        </div>
      </section>
    );
}

export default AboutAuthor