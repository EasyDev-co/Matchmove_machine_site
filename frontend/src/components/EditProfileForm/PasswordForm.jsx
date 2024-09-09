import { useState } from "react"
import Button from "../Button"
import Password from "../Forms/Password"

import { warningsvg, eyesvg, closedeyesvg } from "../../assets/svg/svgimages"

import styles from "./EditProfileForm.module.css"

const PasswordForm = () => {
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({});
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));


        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newErrors = {};

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {

            console.log('Form submitted:', formData);

        }
    };

    return (
        <div className={styles.formcontainer}>
            <hr className={styles.hr} />
            <form onSubmit={handleSubmit}>
                <div className={`form-group ${styles.forms}`}>
                    <label htmlFor="password">
                        <p>New password</p>
                        <Password
                            formData={formData}
                            setFormData={setFormData}
                            errors={errors}
                            setErrors={setErrors}
                        />
                    </label>

                    <label htmlFor="confirmPassword">
                        <p>Confirm password</p>
                        <div className="pass">
                            <div
                                className={`inputSvg ${errors.confirmPassword ? "error" : ""}`}
                                onClick={toggleConfirmPasswordVisibility}
                            >
                                {showConfirmPassword ? closedeyesvg : eyesvg}
                            </div>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="Confirm password"
                                value={formData.confirmPassword || ''}
                                onChange={handleChange}
                                className={errors.confirmPassword ? "error" : ""}
                            />
                        </div>
                        {errors.confirmPassword && (
                            <div className="error-message">
                                {warningsvg} {errors.confirmPassword}
                            </div>
                        )}
                    </label>
                </div>
                <hr className={styles.hr} />
                <div className={styles.btncont}>
                    <Button
                        variant="outline-red"
                        label="Close"
                        labelPosition="left"
                        iconType="crossbtn"
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

export default PasswordForm;