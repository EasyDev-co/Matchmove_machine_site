
import { useState } from "react";
import styles from "./Select.module.css"
import { arrowDown, arrowUp } from "../../assets/svg/svgimages";

const Select = ({ name, placeholder, options, selected, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen(!isOpen);

    const handleOptionClick = (option) => {
        onSelect(option);
        setIsOpen(false);
    };

    return (
        <div className={styles.selectContainer}>
            <div className={styles.selectHeader} onClick={toggleOpen}>
                <span className={`${styles.selectedValue} ${selected ? 'selected' : ''}`}>
                    {selected || placeholder}
                </span>
                <span className={styles.arrow}>
                    {isOpen ? arrowUp : arrowDown}
                </span>
            </div>
            {isOpen && (
                <div className={styles.optionsContainer}>
                    {options.map(option => (
                        <div
                            key={option}
                            className={styles.option}
                            onClick={() => handleOptionClick(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Select;