import styles from "./ProfileTop.module.css";
import iconimg from "../../assets/images/iconplaceholder.png";
import Button from "../Button";
import { resetProfile, updateProfilePicture } from "../../store/slices/profileSlice";
import { useNavigate } from "react-router-dom";
import {
  instagram,
  facebook,
  vimeo,
  linkedin,
  youtube,
} from "../../assets/svg/footerbtnhs";

import { useDispatch } from "react-redux";
import { logoutUserThunk } from "../../store/userSlice";
import { camerasvg } from "../../assets/svg/svgimages"
import { useState } from "react";


const userlinks = [
  { name: "facebook", svg: facebook },
  { name: "vimeo", svg: vimeo },
  { name: "instagram", svg: instagram },
  { name: "linkedin", svg: linkedin },
  { name: "youtube", svg: youtube },
];

const ProfileTop = ({ profile }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [picture, setPicture] = useState(null);

  const navigateTo = () => {
    navigate("/profile/edit");
  };

  const handleLogOut = () => {
    dispatch(logoutUserThunk())
      .unwrap()
      .then(() => {
        dispatch(resetProfile());
        navigate("/");
        window.location.reload();
      })
      .catch((error) => {
        console.log("Logout failed", error);
      });
  };

  const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPicture(reader.result);
          console.log(reader.result)
        };
        reader.readAsDataURL(file);
        console.log(file)
  
        dispatch(updateProfilePicture(file));
      }
    };

  const handlePictureChange = () => {
    document.getElementById("fileInput").click();
  };

  if (profile) {
    return (
      <section className={styles.background}>
        <div className={styles.container}>
          <div className={styles.namecont}>
            <div>
              <Button
                labelPosition="none"
                variant="outline-blue"
                iconType="settings"
                onClick={navigateTo}
              />
            </div>
            <p className="h2-bold">
              <span>{profile.username}</span>
            </p>
          </div>
          <div>
            <Button
              labelPosition="none"
              variant="outline-red"
              iconType="logout"
              onClick={handleLogOut}
            />
          </div>
        </div>

        <div className={`${styles.container} ${styles.mobile}`}>
          <div className={styles.perofileinfo}>
            <div className={styles.iconCont}>
              <img
                src={
                  picture || (profile.profile_picture ? profile.profile_picture : iconimg)
                }
                alt="icon"
              />
              <button
                className={styles.editpicture}
                onClick={handlePictureChange}
              >
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
            <ul>
              {/* <li>
              <h3 className="h3-medium">Email:</h3>{" "}
              <a href="/">{profile.email}</a>
            </li> */}
              {profile.website && (
                <li>
                  <h3 className="h3-medium">Website:</h3>{" "}
                  <a href={profile.website}>{profile.website}</a>
                </li>
              )}
              {profile.portfolio && (
                <li>
                  <h3 className="h3-medium">Portfolio:</h3>
                  <a href={profile.portfolio}>{profile.portfolio}</a>
                </li>
              )}
            </ul>
          </div>

          <div className={styles.perofileinfo}>
            <div>
              <h3 className="h3-medium">Email:</h3>{" "}
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </div>
            <div>
              <h3 className={`h3-medium ${styles.socialmobile}`}>Contacts: </h3>
              <div className={styles.socialsbtns}>
                {userlinks.map(({ name, svg }, index) => {
                  const linkValue = profile[name];
                  return linkValue ? (
                    <a href={linkValue} key={index}>
                      <button className={styles.userlink}>{svg}</button>
                    </a>
                  ) : null;
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
};

export default ProfileTop;
