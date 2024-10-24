import styles from "./Header.module.css"
import { useNavigate } from "react-router-dom"
import icon from "../../assets/images/iconplaceholder.png"

const User =({user})=>{
    
  const navigate = useNavigate()


    const handleGoToProfile =()=>{
        navigate("/profile")
      }

if(user){
  return (
    <button className={styles.userbtn} onClick={handleGoToProfile}>
      <img src={user.profile_picture?user.profile_picture:icon} alt="icon" /> <p className={styles.useName}>{user.username }</p>
    </button>
  );
}
}

export default User