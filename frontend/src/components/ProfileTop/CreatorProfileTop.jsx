import styles from "./ProfileTop.module.css";
import iconimg from "../../assets/images/iconplaceholder.png";
import BASE_URL from "../../config";

import {
  instagram,
  facebook,
  vimeo,
  linkedin,
  youtube,
} from "../../assets/svg/footerbtnhs";

const userlinks = [
  { name: "facebook", svg: facebook },
  { name: "vimeo", svg: vimeo },
  { name: "instagram", svg: instagram },
  { name: "linkedin", svg: linkedin },
  { name: "youtube", svg: youtube },
];

const CreatorProfileTop = ({ profile}) => {


  if(profile){
  return (
    <section className={styles.background}>
      <div className={styles.container}>
        <div className={styles.namecont}>
          <p className="h2-bold">
            <span>{profile.username}</span>
          </p>
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

export default CreatorProfileTop
