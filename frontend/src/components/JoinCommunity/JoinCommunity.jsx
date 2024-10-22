import styles from "./JoinCommunity.module.css"
import Button from "../Button";

import { useNavigate } from "react-router-dom";

const JoinCommunity =()=>{

  const navigate = useNavigate()

  const handleClick = ()=>{
    navigate("/affiliate-program")
  }
    return (
      <section className={styles.main}>
        <div className={styles.content}>
          <h2 className="h2-bold">Join the community</h2>
          <p className="h4-medium">
            Share your assets and become a valued contributor to the Distortion
            Grids Database with bonus access to the library. Let's build an
            incredible library of distortion grids!
          </p>
          <div className={styles.btn}>
            <Button variant="blue" label="Learn how" iconType="arrowRight" onClick={handleClick}/>
          </div>
        </div>
      </section>
    );
}

export default JoinCommunity