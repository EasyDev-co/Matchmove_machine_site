import styles from "./Assets.module.css"
import Button from "../Button";
import { companysvg } from "../../assets/svg/svgimages";
import { pfp } from "../../assets/dummyData";
import { useNavigate } from "react-router-dom";

const Asset = ({asset})=>{
  const navigate =useNavigate()

  const handleNavigation = () => {

    const currentQueryString = window.location.search;
    
    navigate(`/library/product/1?${currentQueryString}`);
  };


  const user = <div className={styles.user}><p>Marvin McKinney</p> <img src={pfp} alt="icon" /></div>
  
    return (
      <article className={styles.asset} onClick={handleNavigation}>
        <div className={styles.assetthumbnail}>
            <div className={styles.creator}>{asset.creator==="company"? companysvg: user}</div>
            <p className={styles.title}>{asset.camera} {asset.lense}</p>
            <Button label={asset.price===0? "Free": `${asset.price}$`} variant={asset.price===0? "grey": "blue"}/>
        </div>
      </article>
    );
}

export default Asset