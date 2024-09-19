import styles from "./ProductBanner.module.css"
import { useState } from "react"
import img  from "../../assets/images/camera.svg"
import imgLeft  from "../../assets/images/cameraLeft.svg"
import imgRight  from "../../assets/images/cameraRight.svg"
import { scrollArrowsvg } from "../../assets/svg/svgimages"
import useSmoothScroll from "../../hooks/useSmoothScroll"

const svg =(
    <svg width="61" height="61" viewBox="0 0 61 61" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M30.5 55.5C44.3075 55.5 55.5 44.3075 55.5 30.5C55.5 16.6925 44.3075 5.5 30.5 5.5C16.6925 5.5 5.5 16.6925 5.5 30.5C5.5 44.3075 16.6925 55.5 30.5 55.5Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M43.4925 23C43.2425 22.57 42.975 22.15 42.685 21.75M45.0275 34.25C44.3555 36.8444 43.0018 39.2118 41.1068 41.1068C39.2118 43.0018 36.8444 44.3555 34.25 45.0275" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
)

const camerasvg =(
    <svg width="61" height="61" viewBox="0 0 61 61" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M59.068 18.4227C58.9182 18.3425 58.7495 18.3045 58.5798 18.3127C58.4102 18.321 58.2459 18.3752 58.1047 18.4695L48.3125 24.9992V17.375C48.3125 16.6291 48.0162 15.9137 47.4887 15.3863C46.9613 14.8588 46.2459 14.5625 45.5 14.5625H8C7.25408 14.5625 6.53871 14.8588 6.01126 15.3863C5.48382 15.9137 5.1875 16.6291 5.1875 17.375V43.625C5.1875 44.3709 5.48382 45.0863 6.01126 45.6137C6.53871 46.1412 7.25408 46.4375 8 46.4375H45.5C46.2459 46.4375 46.9613 46.1412 47.4887 45.6137C48.0162 45.0863 48.3125 44.3709 48.3125 43.625V36.0008L58.1047 42.5305C58.2459 42.6247 58.4101 42.6788 58.5796 42.687C58.7492 42.6952 58.9178 42.6572 59.0675 42.5771C59.2172 42.497 59.3423 42.3777 59.4294 42.232C59.5166 42.0864 59.5626 41.9198 59.5625 41.75V19.25C59.5627 19.0802 59.5168 18.9136 59.4297 18.7679C59.3426 18.6222 59.2176 18.5029 59.068 18.4227ZM46.4375 43.625C46.4375 43.8736 46.3387 44.1121 46.1629 44.2879C45.9871 44.4637 45.7486 44.5625 45.5 44.5625H8C7.75136 44.5625 7.5129 44.4637 7.33709 44.2879C7.16127 44.1121 7.0625 43.8736 7.0625 43.625V17.375C7.0625 17.1264 7.16127 16.8879 7.33709 16.7121C7.5129 16.5363 7.75136 16.4375 8 16.4375H45.5C45.7486 16.4375 45.9871 16.5363 46.1629 16.7121C46.3387 16.8879 46.4375 17.1264 46.4375 17.375V43.625ZM57.6875 39.9992L48.3125 33.7484V27.2516L57.6875 21.0008V39.9992Z" fill="white"/>
</svg>

)

const ProductBanner = () => {
  const [variant, setVariant] = useState(null); 
  const scrollToSection = useSmoothScroll(); 

  const handleLensMouseEnter = () => {
    setVariant('lens');
  };

  const handleCameraMouseEnter = () => {
    setVariant('camera');
  };

  const imageToDisplay = variant === 'lens'
    ? imgLeft
    : variant === 'camera'
    ? imgRight
    : img;

  const handleScroll = () => {
    scrollToSection("description");
  };

  return (
    <section className={styles.main}>
      <div className={styles.imgcont}>
        <div 
          className={`${styles.camerasection} ${variant === 'lens' ? styles.selected : ''}`}  
          onMouseEnter={handleLensMouseEnter}
          onMouseLeave={() => setVariant(null)}
        >
          <div className={styles.sectionTitle}>
            {svg} <h3 className="h3-medium">Lens model</h3>
          </div>
          <p className="h4-medium">EF</p>
        </div>
        <div 
          className={`${styles.camerasection} ${styles.right} ${variant === 'camera' ? styles.selected : ''}`} 
          onMouseEnter={handleCameraMouseEnter}
          onMouseLeave={() => setVariant(null)}
        >
          <div className={styles.sectionTitle}>
            {camerasvg} <h3 className="h3-medium">Camera model</h3>
          </div>
          <p className="h4-medium">ARRI ALEXA 65</p>
        </div>
        <img className={styles.image} src={imageToDisplay} alt="display" />
      </div>
      <button className={styles.scrollbtn} onClick={handleScroll}>{scrollArrowsvg}</button>
    </section>
  );
};

export default ProductBanner;