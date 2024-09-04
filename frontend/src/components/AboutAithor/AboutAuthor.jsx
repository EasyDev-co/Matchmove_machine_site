import styles from "./AboutAuthor.module.css"
import { quotesvg } from "../../assets/svg/svgimages"

const AboutAuthor =()=>{
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
                Lorem ipsum dolor sit amet consectetur. Habitant quam eget
                mollis dui justo duis euismod sit quis. Velit ullamcorper arcu
                sit pellentesque dictum morbi leo cursus tortor. Facilisi sem
                neque convallis ultricies ullamcorper metus. Senectus quam
                interdum dictum consectetur vestibulum.Lorem ipsum dolor sit
                amet consectetur. Habitant quam eget mollis dui justo duis
                euismod sit quis. Velit ullamcorper arcu sit pellentesque dictum
                morbi leo cursus tortor.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
}

export default AboutAuthor