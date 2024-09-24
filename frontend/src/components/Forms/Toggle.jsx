import { useState, useEffect } from "react";
import styles from "./Toggle.module.css";
import { useSearchParams } from 'react-router-dom';

const Toggle = () => {
  const [isOn, setIsOn] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize toggle state based on searchParams on initial render
  useEffect(() => {
    const accessType = searchParams.get("access_type");
    if (accessType === "free") {
      setIsOn(true);
    } else {
      setIsOn(false);
    }
  }, [searchParams]);

  const handleToggle = () => {
    // Update the toggle state
    setIsOn((prev) => !prev);

    // Directly update the search params based on the toggle state
    const updatedSearchParams = new URLSearchParams(searchParams);

    if (!isOn) {
      updatedSearchParams.set("access_type", "free"); // Turn on "free"
    } else {
      updatedSearchParams.delete("access_type"); // Turn off "free"
    }
    updatedSearchParams.set("page", 1); // Reset page to 1

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