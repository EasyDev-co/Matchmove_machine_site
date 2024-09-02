import styles from "./ProfileTop.module.css"
import iconimg from "../../assets/images/iconplaceholder.png"
import Button from "../Button";

const ProfileTop =()=>{
    return (
      <section className={styles.main}>
        <div className={styles.background}>

          <div className={styles.container}>
            <div className={styles.namecont}>
            <div><Button labelPosition="none" variant="outline-blue" iconType="settings" /></div>
              <p className="h2-bold"><span className={styles.rating} >#109/</span> <span>Greg</span></p>
            </div>
            <div><Button labelPosition="none" variant="outline-red" iconType="logout" /></div>
          </div>

          <div className={`${styles.container} ${styles.mobile}`}>

            <div className={styles.perofileinfo}>
                <div className={styles.iconCont}><img src={iconimg} alt="icon" /></div>
                <ul>
                    <li><h3 className="h3-medium">Email:</h3> <a>greg-grids@machine.com</a></li>
                    <li><h3 className="h3-medium">Website:</h3> <a>https://machine.com</a></li>
                    <li><h3 className="h3-medium">Portfolio:</h3> <a>https://behance.com/greg-grids</a></li>
                </ul>
            </div>

            <div className={styles.perofileinfo}>
                <h3 className={`h3-medium ${styles.socialmobile}`}>Contacts: </h3>
                <div className={styles.socialsbtns}>{ Array.from({ length: 5 },(_, index)=> <div key={index}><Button labelPosition="none" variant="grey" iconType="person" /></div>)} </div>
            </div>
          </div>

        </div>
      </section>
    );
}

export default ProfileTop