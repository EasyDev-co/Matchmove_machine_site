import styles from "./ProductField.module.css"
import { useState } from "react"
import FileBlock from "./FileBlock";
import Description from "./Description";
import HowToUse from "./HowToUse";

const ProductField =({singleProduct})=>{
    const [activeButton, setActiveButton] = useState('Assets');

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
    };

    return (
        <section className={styles.main}>
            <div className={styles.toggleCont}>
                <button
                    onClick={() => handleButtonClick('Assets')}
                    className={activeButton === 'Assets' ? styles.active : ''}
                >
                    <h2 className="h2-medium">Assets</h2>
                </button>
                <button
                    onClick={() => handleButtonClick('Description')}
                    className={activeButton === 'Description' ? styles.active : ''}
                >
                    <h2 className="h2-medium">Description</h2>
                </button>
                <button
                    onClick={() => handleButtonClick('How to use')}
                    className={activeButton === 'How to use' ? styles.active : ''}
                >
                    <h2 className="h2-medium">How to use</h2>
                </button>
            </div>
            {activeButton==="Assets" && <FileBlock/>}
            {activeButton==="Description" && <Description description={singleProduct.description}/>}
            {activeButton === "How to use" && <HowToUse/>}
        </section>
    );
};

export default ProductField