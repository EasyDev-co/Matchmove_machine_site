import styles from "./EditProfileForm.module.css"
import { useState } from "react"
import InformationForm from "./InformationForm";
import AboutMeForm from "./AboutMeForm";
import SocialsForm from "./SocialsForm";
import PasswordForm from "./PasswordForm";

const EditProfileForm = () => {
    const [activeButton, setActiveButton] = useState('Information');

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
    };

    return (
        <div className={styles.container}>
            <div className={styles.scrollableToggle}>
                <div className={styles.toggle}>
                    <button
                        className={`${styles.fieldbtn} ${activeButton === 'Information' ? styles.active : ''}`}
                        onClick={() => handleButtonClick('Information')}
                    >
                        Information
                    </button>
                    <button
                        className={`${styles.fieldbtn} ${activeButton === 'About me' ? styles.active : ''}`}
                        onClick={() => handleButtonClick('About me')}
                    >
                        About me
                    </button>
                    <button
                        className={`${styles.fieldbtn} ${activeButton === 'Socials' ? styles.active : ''}`}
                        onClick={() => handleButtonClick('Socials')}
                    >
                        Socials
                    </button>
                    <button
                        className={`${styles.fieldbtn} ${activeButton === 'Password' ? styles.active : ''}`}
                        onClick={() => handleButtonClick('Password')}
                    >
                        Password
                    </button>
                </div>
            </div>
            {activeButton === 'Information' && <InformationForm />}
            {activeButton === 'About me' && <AboutMeForm />}
            {activeButton === 'Socials' && <SocialsForm />}
            {activeButton === 'Password' && <PasswordForm />}
        </div>
    );
};

export default EditProfileForm;