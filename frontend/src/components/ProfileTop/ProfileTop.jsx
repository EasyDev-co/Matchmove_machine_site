import styles from "./ProfileTop.module.css";
import iconimg from "../../assets/images/iconplaceholder.png";
import Button from "../Button";
import { resetProfile } from "../../store/slices/profileSlice";
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

const userlinks = [
  { name: "facebook", svg: facebook },
  { name: "vimeo", svg: vimeo },
  { name: "instagram", svg: instagram },
  { name: "linkedin", svg: linkedin },
  { name: "youtube", svg: youtube },
];

const ProfileTop = ({ profile}) => {

  const navigate = useNavigate();
  const dispatch=useDispatch()

  const navigateTo = () => {
    navigate("/profile/edit");
  };

  const handleLogOut = () => {
    dispatch(logoutUserThunk())
      .unwrap()
      .then(() => {
        dispatch(resetProfile())
        navigate("/"); // Navigate to the main screen after successful logout
      })
      .catch((error) => {
        console.log("Logout failed", error); // Handle any errors
      });
  };

  if(profile){
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
              src={profile.profile_picture ? profile.profile_picture : iconimg}
              alt="icon"
            />
          </div>
          <ul>
            <li>
              <h3 className="h3-medium">Email:</h3>{" "}
              <a href="/">{profile.email}</a>
            </li>
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
          <h3 className={`h3-medium ${styles.socialmobile}`}>Contacts: </h3>
          <div className={styles.socialsbtns}>
            {userlinks.map(({name, svg}, index) => {
              const linkValue = profile[name];
              return linkValue ? (
                <a
                  href={linkValue}
                  key={index}
                >
                  <button className={styles.userlink}>
                    {svg}
                  </button>
                </a>
              ) : null;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
};

export default ProfileTop;
