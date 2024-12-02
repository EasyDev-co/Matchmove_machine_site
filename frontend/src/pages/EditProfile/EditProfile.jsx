import ModalWrap from "../../components/Modal/ModalWrap"
import styles from "./EditProfile.module.css"
import EditHeader from "../../components/EditHeader/EditHeader"
import EditProfileForm from "../../components/EditProfileForm/EditProfileForm"
import iconimg from "../../assets/images/iconplaceholder.png";
import { camerasvg } from "../../assets/svg/svgimages"

import {fetchUserProfile, updateProfilePicture} from "../../store/slices/profileSlice"

import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"

const EditProfile = () => {
  const { profile, status } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [picture, setPicture] = useState(null);
  const BACKEND_PHOTO_URL = 'http://89.58.57.91:8084';

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPicture(reader.result);
      };
      reader.readAsDataURL(file);

      dispatch(updateProfilePicture(file));
    }
  };

  const handlePictureChange = () => {
    document.getElementById("fileInput").click();
  };

  if (profile) {
    return (
      <ModalWrap>
        <div className={styles.container}>
          <EditHeader />
          <div className={styles.body}>
            <div className={styles.pictureField}>
              <div className={styles.pictureCont}>
                <img
                    src={
                        picture ||
                        (profile.profile_picture
                            ? `${BACKEND_PHOTO_URL}${profile.profile_picture}`
                            : iconimg)
                    }
                    alt="Profile"
                />
                <button className={styles.editpicture} onClick={handlePictureChange}>
                  {camerasvg}
                </button>
                <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    style={{display: "none"}}
                    onChange={handleFileChange}
                />
              </div>
            </div>
            <EditProfileForm profile={profile} picture={picture} status={status}/>
          </div>
        </div>
      </ModalWrap>
    );
  }
  return null;
};

export default EditProfile;