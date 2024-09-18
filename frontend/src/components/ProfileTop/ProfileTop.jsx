import styles from "./ProfileTop.module.css";
import iconimg from "../../assets/images/iconplaceholder.png";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import {
  instagram,
  facebook,
  vimeo,
  linkedin,
  youtube,
} from "../../assets/svg/footerbtnhs";

const userlinks = [facebook, vimeo, instagram, linkedin, youtube];

const ProfileTop = ({ profile }) => {
  const navigate = useNavigate();

  const navigateTo = () => {
    navigate("/profile/edit");
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
            <span className={styles.rating}>#109/</span>{" "}
            <span>{profile.username}</span>
          </p>
        </div>
        <div>
          <Button
            labelPosition="none"
            variant="outline-red"
            iconType="logout"
          />
        </div>
      </div>

      <div className={`${styles.container} ${styles.mobile}`}>
        <div className={styles.perofileinfo}>
          <div className={styles.iconCont}>
            <img src={profile.profile_picture?profile.profile_picture:iconimg} alt="icon" />
          </div>
          <ul>
            <li>
              <h3 className="h3-medium">Email:</h3> <a>{profile.email}</a>
            </li>
            <li>
              <h3 className="h3-medium">Website:</h3> <a>{profile.website}</a>
            </li>
            <li>
              <h3 className="h3-medium">Portfolio:</h3>{" "}
              <a>{profile.portfolio}</a>
            </li>
          </ul>
        </div>

        <div className={styles.perofileinfo}>
          <h3 className={`h3-medium ${styles.socialmobile}`}>Contacts: </h3>
          <div className={styles.socialsbtns}>
            {userlinks.map((item, index) => (
              <button className={styles.userlink} key={index}>
                {item}
              </button>
            ))}{" "}
          </div>
        </div>
      </div>
    </section>
  );
}
};

export default ProfileTop;
