import styles from "./HowItWorks.module.css"
import image from "../../assets/images/sharebackground.png" 
import howitworksimg from "../../assets/images/howitworks.svg" 
import Button from "../Button";

import { useNavigate } from "react-router-dom";

const HowItWorks =()=>{

  const navigate = useNavigate()

  const goToPage = ()=>{
    navigate("/how-it-works")
  }

    return (
      <section className={`height ${styles.main}`}>
        <div className={styles.content}>
          <div className={styles.imgCont}>
          <img className={styles.imgbg} src={image} alt="how-it-works" />
          <img className={styles.img} src={howitworksimg} alt="sign" />
          </div>
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
            <Button label="See more" iconType="arrowRight" onClick={goToPage} />
          </div>
        </div>
      </section>
    );
}

export default HowItWorks