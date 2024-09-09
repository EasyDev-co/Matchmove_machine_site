import styles from "./EditHeader.module.css"
import { closesvg } from "../../assets/svg/svgimages";
import { useNavigate } from "react-router-dom";

const EditHeader =()=>{

    const navigate = useNavigate()

    const handleClose =()=>{
        navigate(-1)
    }
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className="h2-bold">Edit Profile</h2>
          <button className={styles.btn} onClick={handleClose}>{closesvg}</button>
        </div>
      </div>
    );
}

export default EditHeader;