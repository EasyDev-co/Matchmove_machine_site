import styles from "./Header.module.css"
import { useNavigate } from "react-router-dom"
import { getUsernameFromToken } from "../../utils/getUsernameFromToken";
import icon from "../../assets/images/iconplaceholder.png"

const User =()=>{
    
  const navigate = useNavigate()
  const user = getUsernameFromToken()

    const handleGoToProfile =()=>{
        navigate("/profile/1")
      }

    return (
      <button className={styles.userbtn} onClick={handleGoToProfile}>
        <img src={icon} alt="icon" /> <p className={styles.useName}>{user}</p>
      </button>
    );
}

export default User