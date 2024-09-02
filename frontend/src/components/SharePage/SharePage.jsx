import styles from "./SharePage.module.css"
import qrimg from "../../assets/images/QR.svg"
import { linksvg, copylinksvg } from "../../assets/svg/svgimages";
import { socials } from "../../assets/svg/socialicons";

const SharePage =()=>{

    const linkToCopy = "https://grids.matchmovemachine.com/profile/109";

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(linkToCopy);
            console.log("copied");
            
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };


    return (
      <section className="width">
        <h2 className="h2-medium">Share this page</h2>
        <div className={styles.container}>
          <div className={styles.qr}>
            <img src={qrimg} alt="qr" />
          </div>
          <div className={styles.content}>
            <h4 className="h4-medium">{linksvg} Link</h4>
            <div className={styles.link}>
              <div className={styles.inputcont}>
                <button className={styles.copybtn} onClick={copyToClipboard}>{copylinksvg}</button>
                <div className={styles.input}>{linkToCopy}</div>
              </div>
            </div>
            <div className={styles.socials}>{socials.map((item)=><button key={item.id} className={styles.socialbtn}>{item.icon} <p>{item.name}</p></button>)}</div>
          </div>
        </div>
      </section>
    );
}

export default SharePage;