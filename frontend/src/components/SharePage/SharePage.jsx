import styles from "./SharePage.module.css";
import { linksvg, copylinksvg } from "../../assets/svg/svgimages";
import { socials } from "../../assets/svg/socialicons";

const SharePage = ({ profile, profileId }) => {
  const linkToCopy = `https://grids.matchmovemachine.com/profile/${profile.id || profileId}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(linkToCopy);
      console.log("copied");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleSocialClick = (event, link) => {
    if (!link) {
      event.preventDefault();
    }
  };

  return (
    <section className={` width ${styles.bottom}`}>
      <h2 className="h2-medium">Share this page</h2>
      <div className={styles.container}>
        <div className={styles.qr}>
        {profile.qr_code&&<img src={`${profile.qr_code}`} alt="qr" />}
        </div>
        <div className={styles.content}>
          <h4 className="h4-medium">{linksvg} Link</h4>
          <div className={styles.link}>
            <div className={styles.inputcont}>
              <button className={styles.copybtn} onClick={copyToClipboard}>
                {copylinksvg}
              </button>
              <div className={styles.input}>{linkToCopy}</div>
            </div>
          </div>
          <div className={styles.socials}>
            {socials.map((item) => {
              const link = profile[item.key] || "";

              return (
                <a
                  key={item.id}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => handleSocialClick(e, link)} 
                >
                  <button className={styles.socialbtn}>
                    {item.icon} <p>{item.name}</p>
                  </button>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SharePage;
