import styles from "./HowItWorks.module.css"
import image from "../../assets/images/howItWorks.png" 
import Button from "../Button";

const HowItWorks =()=>{
    return (
      <section className={`height ${styles.main}`}>
        <div className={styles.content}>
          <img src={image} alt="how-it-works" />
          <h2 className="h2-bold">How it works</h2>
          <p className="h4-medium">
            We film distortion grids following the guide and then we create
            presets and STMaps.
          </p>
          <p className="h4-medium">
            If you spot this icon on an asset, it signifies that we meticulously
            crafted it in our Matchmove machine studio, ensuring the quality of
            the purchased asset is guaranteed.
          </p>
          <p className="h4-medium">
            Otherwise, we offer a money-back guarantee. Assets lacking this mark
            are available for free download, uploaded by users, and we cannot
            assure they will function exactly as intended. Discover more about
            our process for preparing and testing distortion grids and presets.
          </p>
          <div className={styles.btn}>
            <Button label="See more" iconType="arrowRight" />
          </div>
        </div>
      </section>
    );
}

export default HowItWorks