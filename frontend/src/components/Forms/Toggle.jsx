import { useState } from "react";
import styles from "./Toggle.module.css";

const Toggle = () => {

    const [isOn, setIsOn] = useState(false)

    const handleToggle =()=>{
        setIsOn(prev =>!prev)
      }

  return (
    <div>
      <div
        className={`${styles.toggleSwitch} ${isOn ? styles.on : ""}`}
        onClick={handleToggle}
      >
        <div className={styles.toggleButton}></div>
      </div>
    </div>
  );
};

export default Toggle;
