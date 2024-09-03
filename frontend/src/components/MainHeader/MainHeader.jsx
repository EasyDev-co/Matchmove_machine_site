import styles from "./MainHeader.module.css"
import Button from "../Button";

const MainHeader =()=>{
    return (
      <section className={styles.main}>
        <h1 className={`h1-bold ${styles.title}`}>Distortion grids database</h1>
        <p className="h3-light">
          You can easily search ready-to-use distortion grids from our database.
          Just select the desired camera and lens, then click the 'Browse'
          button, or see the full library of available assets by clicking the
          link below.
        </p>

        <div className={styles.searchcont}>
          <select id="occupation" name="occupation" value={""}>
            <option value="" disabled>
              Select your occupation
            </option>
          </select>

          <select id="occupation" name="occupation" value={""}>
            <option value="" disabled>
              Select your occupation
            </option>
          </select>

          <select id="occupation" name="occupation" value={""}>
            <option value="" disabled>
              Select your occupation
            </option>
          </select>

          <Button/>
        </div>

        <div><Button labelPosition="left" variant="outline-grey" label="See full library" iconType="arrowRight"/></div>
      </section>
    );
}

export default MainHeader