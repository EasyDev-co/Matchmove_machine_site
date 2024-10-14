import NavigationTop from "../../components/NavigationTop/NavigationTop";
import MainShare from "../../components/MainShare/MainShare";
import styles from "./HowTo.module.css";

import videoImage from "../../assets/images/videoPlaceholder.png";
import presetImg from "../../assets/images/presetProcess.png";
import similiarityImg from "../../assets/images/similarity.png";
import testImg from "../../assets/images/testexample.png";


const HowTo = () => {
  return (
    <div>
      <NavigationTop
        title={"How it works"}
        text={
          "Lorem ipsum dolor sit amet consectetur. Habitant quam eget mollis dui justo duis euismod sit quis. Velit ullamcorper arcu sit pellentesque dictum morbi leo cursus tortor. Facilisi sem neque convallis ultricies ullamcorper metus. Senectus quam interdum dictum consectetur vestibulum."
        }
      />
      <MainShare/>
      <section className={`width ${styles.sectioncont}`}>
        <h2 className="h2-bold">Distortion grid shooting technique</h2>
        <div className={styles.textpiccont}>
          <div className={`${styles.piccont} ${styles.video}`}>
            <img src={videoImage} alt="video" />
          </div>
          <div className={styles.textcont}>
            <p>
              Lorem ipsum dolor sit amet consectetur. Habitant quam eget mollis
              dui justo duis euismod sit quis. Velit ullamcorper arcu sit
              pellentesque dictum morbi leo cursus tortor. Facilisi sem neque
              convallis ultricies ullamcorper metus. Senectus quam interdum
              dictum consectetur vestibulum. Lorem ipsum dolor sit amet
              consectetur. Habitant quam eget mollis dui justo duis euismod sit
              quis. Velit ullamcorper arcu sit pellentesque dictum morbi leo
              cursus tortor. Facilisi sem neque convallis ultricies ullamcorper
              metus. Senectus quam interdum dictum consectetur vestibulum. Lorem
              ipsum dolor sit amet consectetur. Habitant quam eget mollis dui
              justo duis euismod sit quis. Velit ullamcorper arcu sit
              pellentesque dictum morbi leo cursus tortor.
            </p>
            <p>
              Facilisi sem neque convallis ultricies ullamcorper metus. Senectus
              quam interdum dictum consectetur vestibulum. Lorem ipsum dolor sit
              amet consectetur. Habitant quam eget mollis dui justo duis euismod
              sit quis. Velit ullamcorper arcu sit pellentesque dictum morbi leo
              cursus tortor. Facilisi sem neque convallis ultricies ullamcorper
              metus. Senectus quam interdum dictum consectetur vestibulum.
            </p>
          </div>
        </div>
        <div className={styles.textcont}>
            <p>
              Lorem ipsum dolor sit amet consectetur. Habitant quam eget mollis
              dui justo duis euismod sit quis. Velit ullamcorper arcu sit
              pellentesque dictum morbi leo cursus tortor. Facilisi sem neque
              convallis ultricies ullamcorper metus. Senectus quam interdum
              dictum consectetur vestibulum. Lorem ipsum dolor sit amet
              consectetur. Habitant quam eget mollis dui justo duis euismod sit
              quis. Velit ullamcorper arcu sit pellentesque dictum morbi leo
              cursus tortor. Facilisi sem neque convallis ultricies ullamcorper
              metus. Senectus quam interdum dictum consectetur vestibulum. Lorem
              ipsum dolor sit amet consectetur. Habitant quam eget mollis dui
              justo duis euismod sit quis. Velit ullamcorper arcu sit
              pellentesque dictum morbi leo cursus tortor.
            </p>
            <p>
              Facilisi sem neque convallis ultricies ullamcorper metus. Senectus
              quam interdum dictum consectetur vestibulum. Lorem ipsum dolor sit
              amet consectetur. Habitant quam eget mollis dui justo duis euismod
              sit quis. Velit ullamcorper arcu sit pellentesque dictum morbi leo
              cursus tortor. Facilisi sem neque convallis ultricies ullamcorper
              metus. Senectus quam interdum dictum consectetur vestibulum.
            </p>
          </div>
      </section>

      <section className={`width ${styles.sectioncont}`}>
        <h2 className="h2-bold">Preset process</h2>
        <div className={styles.textpiccont}>
          <div className={`${styles.piccont} ${styles.left}`}>
            <img src={presetImg} alt="preset" />
          </div>
          <div className={styles.textcont}>
            <p>
              Lorem ipsum dolor sit amet consectetur. Habitant quam eget mollis
              dui justo duis euismod sit quis. Velit ullamcorper arcu sit
              pellentesque dictum morbi leo cursus tortor. Facilisi sem neque
              convallis ultricies ullamcorper metus. Senectus quam interdum
              dictum consectetur vestibulum.Lorem ipsum dolor sit amet
              consectetur. Habitant quam eget mollis dui justo duis euismod sit
              quis. Velit ullamcorper arcu sit pellentesque dictum morbi leo
              cursus tortor. Facilisi sem neque convallis ultricies ullamcorper
              metus. Senectus quam interdum dictum consectetur vestibulum.Lorem
              ipsum dolor sit amet consectetur. Habitant quam eget mollis dui
              justo duis euismod sit quis. Velit ullamcorper arcu sit
              pellentesque dictum morbi leo cursus tortor.
            </p>
            <p>
              Facilisi sem neque convallis ultricies ullamcorper metus. Senectus
              quam interdum dictum consectetur vestibulum.Lorem ipsum dolor sit
              amet consectetur. Habitant quam eget mollis dui justo duis euismod
              sit quis. Velit ullamcorper arcu sit pellentesque dictum morbi leo
              cursus tortor. Facilisi sem neque convallis ultricies ullamcorper
              metus. Senectus quam interdum dictum consectetur vestibulum.
            </p>
          </div>
        </div>
      </section>

      <section className={`width ${styles.sectioncont}`}>
        <h2 className="h2-bold">Similarity testing techniques</h2>
        <div className={styles.textpiccont}>
          <div className={styles.piccont}>
            <img src={similiarityImg} alt="similarity" />
          </div>
          <div className={styles.textcont}>
            <p>
              Lorem ipsum dolor sit amet consectetur. Habitant quam eget mollis
              dui justo duis euismod sit quis. Velit ullamcorper arcu sit
              pellentesque dictum morbi leo cursus tortor. Facilisi sem neque
              convallis ultricies ullamcorper metus. Senectus quam interdum
              dictum consectetur vestibulum. Lorem ipsum dolor sit amet
              consectetur. Habitant quam eget mollis dui justo duis euismod sit
              quis. Velit ullamcorper arcu sit pellentesque dictum morbi leo
              cursus tortor. Facilisi sem neque convallis ultricies ullamcorper
              metus. Senectus quam interdum dictum consectetur vestibulum.
            </p>
            <p>
              Facilisi sem neque convallis ultricies ullamcorper metus. Senectus
              quam interdum dictum consectetur vestibulum. Lorem ipsum dolor sit
              amet consectetur. Habitant quam eget mollis dui justo duis euismod
              sit quis. Velit ullamcorper arcu sit pellentesque dictum morbi leo
              cursus tortor. Facilisi sem neque convallis ultricies ullamcorper
              metus. Senectus quam interdum dictum consectetur vestibulum.
            </p>
          </div>
        </div>
        <div className={styles.textcont}>
          <p>
            Lorem ipsum dolor sit amet consectetur. Habitant quam eget mollis
            dui justo duis euismod sit quis. Velit ullamcorper arcu sit
            pellentesque dictum morbi leo cursus tortor. Facilisi sem neque
            convallis ultricies ullamcorper metus. Senectus quam interdum dictum
            consectetur vestibulum. Lorem ipsum dolor sit amet consectetur.
            Habitant quam eget mollis dui justo duis euismod sit quis. Velit
            ullamcorper arcu sit pellentesque dictum morbi leo cursus tortor.
          </p>
          <p>
            Facilisi sem neque convallis ultricies ullamcorper metus. Senectus
            quam interdum dictum consectetur vestibulum. Lorem ipsum dolor sit
            amet consectetur. Habitant quam eget mollis dui justo duis euismod
            sit quis. Velit ullamcorper arcu sit pellentesque dictum morbi leo
            cursus tortor.
          </p>
        </div>
      </section>

      <section className={`height ${styles.sectioncont}`}>
        <h2 className="h2-bold">Test example</h2>
        <div className={styles.textpiccont}>
          <div className={styles.piccont}>
            <img src={testImg} alt="test-example" />
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur. Habitant quam eget mollis
            dui justo duis euismod sit quis. Velit ullamcorper arcu sit
            pellentesque dictum morbi leo cursus tortor. Facilisi sem neque
            convallis ultricies ullamcorper metus. Senectus quam interdum dictum
            consectetur vestibulum. Lorem ipsum dolor sit amet consectetur.
            Habitant quam eget mollis dui justo duis euismod sit quis. Velit
            ullamcorper arcu sit pellentesque dictum morbi leo cursus tortor.
            Facilisi sem neque convallis ultricies ullamcorper metus. Senectus
            quam interdum dictum consectetur vestibulum.
          </p>
          <p>
            Facilisi sem neque convallis ultricies ullamcorper metus. Senectus
            quam interdum dictum consectetur vestibulum. Lorem ipsum dolor sit
            amet consectetur. Habitant quam eget mollis dui justo duis euismod
            sit quis. Velit ullamcorper arcu sit pellentesque dictum morbi leo
            cursus tortor. Facilisi sem neque convallis ultricies ullamcorper
            metus. Senectus quam interdum dictum consectetur vestibulum.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HowTo;
