import styles from "./JoinCommunity.module.css"
import Button from "../Button";

const JoinCommunity =()=>{
    return (
      <section className={styles.main}>
        <div className={styles.content}>
          <h2 className="h2-bold">Join the community</h2>
          <p className="h4-light">
            Share your assets and become a valued contributor to the Distortion
            Grids Database with bonus access to the library. Let's build an
            incredible library of distortion grids!
          </p>
          <div className={styles.btn}>
            <Button variant="blue" label="Learn how" iconType="arrowRight" />
          </div>
        </div>
      </section>
    );
}

export default JoinCommunity