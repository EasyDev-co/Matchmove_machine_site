import { useState } from "react";
import styles from "./Toggle.module.css";
import { useSearchParams } from 'react-router-dom';

const Toggle = () => {

    const [isOn, setIsOn] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams();

    const handleToggle = () => {
      // Update the toggle state
      setIsOn((prev) => !prev);
  
      // Directly update the search params based on the toggle state
      const updatedSearchParams = new URLSearchParams(searchParams);
      
      if (!isOn) {
        updatedSearchParams.set("access_type", "free"); // Turn on "free"
        updatedSearchParams.set("page", 1); 
      } else {
        updatedSearchParams.delete("access_type"); // Turn off "free"
        updatedSearchParams.set("page", 1); 
      }
  
      setSearchParams(updatedSearchParams);
    };

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
