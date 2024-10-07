import styles from "./Assets.module.css"
import Button from "../Button";
import { companysvg } from "../../assets/svg/svgimages";
import pfp  from "../../assets/images/iconplaceholder.png";
import { useNavigate } from "react-router-dom";

const Asset = ({asset})=>{
  const navigate =useNavigate()
  
  const handleNavigation = () => {
    navigate(`/library/product/${asset.id}`);
  };

  const user = <div className={styles.user}><p>{asset.author.username}</p> <img src={asset.author.profile_picture? asset.author.profile_picture:pfp} alt="icon" /></div>
  
    return (
      <article className={styles.asset} onClick={handleNavigation}>
        <div className={styles.assetthumbnail}>
            <div className={styles.creator}>{asset.creator==="company"? companysvg: user}</div>
            <p className={styles.title}>{asset.camera.model_name} {asset.lens.brand} {asset.lens.model_name}</p>
            <Button label={!asset.price? "FREE": `${asset.price}$`} variant={!asset.price? "grey": "blue"}/>
        </div>
      </article>
    );
}

export default Asset