import { useState } from "react";
import Input from "../Forms/Input"
import Button from "../Button";
import styles from "./EditProfileForm.module.css"

const SocialsForm = () => {
    const [formData, setFormData] = useState({
        facebook: '',
        twitter: '',
        whatsapp: '',
        telegram: '',
        messenger: '',
        linkedin: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission
        console.log('Form submitted:', formData);
        // Example: send formData to API or process it as needed
    };

    const goBack = () => {
        // Handle the back navigation logic
        console.log('Go back');
    };

    return (
        <div className={styles.formcontainer}>
            <hr className={styles.hr} />
            <form onSubmit={handleSubmit}>
                <div className={`form-group ${styles.forms}`}>
                    {['facebook', 'twitter', 'whatsapp', 'telegram', 'messenger', 'linkedin'].map((social) => (
                        <label key={social} htmlFor={social}>
                            <p>{social.charAt(0).toUpperCase() + social.slice(1)}</p>
                            <Input
                                name={social}
                                placeholder={`${social.charAt(0).toUpperCase() + social.slice(1)}`}
                                value={formData[social]}
                                onChange={handleChange}
                                errors={errors}
                            />
                        </label>
                    ))}
                </div>
                <hr className={styles.hr} />
                <div className={styles.btncont}>
                    <Button
                        variant="outline-red"
                        label="Close"
                        labelPosition="left"
                        iconType="crossbtn"
                        onClick={goBack}
                    />
                    <Button
                        variant="blue"
                        label="Save changes"
                        labelPosition="left"
                        iconType="checkMark"
                        type="submit"
                    />
                </div>
            </form>
        </div>
    );
};

export default SocialsForm;