
import { useState, useEffect, useRef } from "react";
import styles from "./Select.module.css"
import { arrowDown, arrowUp } from "../../assets/svg/svgimages";

const Select = ({ placeholder, options, selected, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef(null);
  
    const toggleOpen = () => setIsOpen(!isOpen);
  
    const handleOptionClick = (optionId) => {
      onSelect(optionId);
      setIsOpen(false);
    };

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (selectRef.current && !selectRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };
  
      document.addEventListener("mousedown", handleClickOutside);
  
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
  
    const selectedLabel = options.find(option => option.id === selected)?.label || placeholder;
  
    return (
      <div className={styles.selectContainer} ref={selectRef}>
        <div className={styles.selectHeader} onClick={toggleOpen}>
          <span className={`${styles.selectedValue} ${selected ? 'selected' : ''}`}>
            {selectedLabel}
          </span>
          <span className={styles.arrow}>
            {isOpen ? arrowUp : arrowDown}
          </span>
        </div>
        {isOpen && (
          <div className={styles.optionsContainer}>
            {options.map(option => (
              <div
                key={option.id}
                className={styles.option}
                onClick={() => handleOptionClick(option.id)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  export default Select;