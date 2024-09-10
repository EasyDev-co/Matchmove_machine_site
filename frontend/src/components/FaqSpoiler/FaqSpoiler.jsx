import styles from "./FaqSpoiler.module.css";
import { useState } from "react";
import { spoilerbtnopen, spoilerbtnclose } from "../../assets/svg/svgimages";

const FaqSpoiler = ({ spoiler }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleAnswer = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <div className={styles.spoilerCont}>
        <div className={styles.question}  onClick={toggleAnswer}>
          <h4 className={`h4-medium ${isOpen? styles.active :""}`}>{spoiler.title}</h4>
          <button>
            {isOpen? spoilerbtnclose : spoilerbtnopen}
          </button>
        </div>
        {isOpen && (
          <div className={styles.answer}>
            <p>{spoiler.text}</p>
          </div>
        )}
       
      </div>
    );
  };
  
  export default FaqSpoiler;