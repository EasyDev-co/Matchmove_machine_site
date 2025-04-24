import styles from "./ProfileTop.module.css";
import iconimg from "../../assets/images/iconplaceholder.png";
import BASE_URL from "../../config";

import {
  instagram,
  facebook,
  vimeo,
  linkedin,
  youtube,
  telegram,
  whatsapp,
  messenger,
  X,
  reddit
} from "../../assets/svg/footerbtnhs";

const userlinks = [
  { name: "facebook", svg: facebook },
    { name: "vimeo", svg: vimeo },
    { name: "instagram", svg: instagram },
    { name: "linkedin", svg: linkedin },
    { name: "youtube", svg: youtube },
    {name: "telegram", svg: telegram},
    {name: "whatsapp", svg: whatsapp},
    {name: "messenger", svg: messenger},
    {name: "X", svg: X},
    {name: "reddit", svg: reddit},
];

const CreatorProfileTop = ({ profile }) => {
  if (profile) {
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
                src={
                  profile.profile_picture ? profile.profile_picture : iconimg
                }
                alt="icon"
              />
            </div>
            <ul style={{marginTop: '5px'}}>
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
            {userlinks.some(({ name }) => profile[name]) && (
              <>
                <h3 className={`h3-medium ${styles.socialmobile}`}>
                  Contacts:{" "}
                </h3>
                <div className={styles.socialsbtns}>
                  {userlinks.map(({ name, svg }, index) => {
                    let linkValue = profile[name];
                    if (name === "X") {
                      linkValue = profile.twitter
                    }
                    return linkValue ? (
                      <a href={linkValue} key={index}>
                        <button className={styles.userlink}>{svg}</button>
                      </a>
                    ) : null;
                  })}
                </div>
              </>
            )}
            {/* <h3 className={`h3-medium ${styles.socialmobile}`}>Contacts: </h3>
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
          </div> */}
          </div>
        </div>
      </section>
    );
  }
};

export default CreatorProfileTop;
