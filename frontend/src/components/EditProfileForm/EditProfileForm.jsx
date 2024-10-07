import styles from "./EditProfileForm.module.css"
import { useState } from "react"
import InformationForm from "./InformationForm";
import AboutMeForm from "./AboutMeForm";
import SocialsForm from "./SocialsForm";
import PasswordForm from "./PasswordForm";


const EditProfileForm = ({profile, picture, status}) => {

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
            {activeButton === 'Information' && <InformationForm profile={profile} picture={picture} status={status.updateUserProfileStatus} />}
            {activeButton === 'About me' && <AboutMeForm about={profile.about_me} picture={picture} status={status.updateUserProfileStatus} />}
            {activeButton === 'Socials' && <SocialsForm profile={ profile} picture={picture} status={status.updateUserProfileStatus} />}
            {activeButton === 'Password' && <PasswordForm email={profile.email} picture={picture} status={status.changePasswordStatus} />}
        </div>
    );
};

export default EditProfileForm;