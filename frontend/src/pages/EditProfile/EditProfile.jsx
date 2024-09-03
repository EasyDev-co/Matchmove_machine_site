import ModalWrap from "../../components/Modal/ModalWrap"
import styles from "./EditProfile.module.css"
import EditHeader from "../../components/EditHeader/EditHeader"
import EditProfileForm from "../../components/EditProfileForm/EditProfileForm"
import { pfp } from "../../assets/dummyData"
import { camerasvg } from "../../assets/svg/svgimages"

const EditProfile =()=>{
    return (
      <ModalWrap>
        <div className={styles.container}>
          <EditHeader />
          <div className={styles.body}>
            <div className={styles.pictureField}>
              <div className={styles.pictureCont}>
                <img src={pfp} alt="pfp" />
                <button className={styles.editpicture}>{camerasvg}</button>
              </div>
            </div>
            <EditProfileForm />
          </div>
        </div>
      </ModalWrap>
    );
}

export default EditProfile