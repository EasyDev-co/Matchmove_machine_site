import styles from "./FaqSpoiler.module.css";
import { useState } from "react";
import { spoilerbtnopen } from "../../assets/svg/svgimages";

const FaqSpoiler = ({ spoiler }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleAnswer = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <div className={styles.spoilerCont}>
        <div className={styles.question}  onClick={toggleAnswer}>
          <h4 className="h4-medium">{spoiler.title}</h4>
          <button>
            {spoilerbtnopen}
          </button>
        </div>
        {isOpen && (
          <div className={styles.answer}>
            <p>{spoiler.text}</p>
          </div>
        )}
        <hr />
      </div>
    );
  };
  
  export default FaqSpoiler;