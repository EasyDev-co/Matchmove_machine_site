import { useState } from "react"
import Button from "../Button"
import Password from "../Forms/Password"

import { warningsvg, eyesvg, closedeyesvg } from "../../assets/svg/svgimages"

import styles from "./EditProfileForm.module.css"

import { useDispatch } from "react-redux"
import { changePassword } from "../../store/slices/profileSlice"

const PasswordForm = ({status}) => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        old_password: '',
        new_password: '',
    });

    const [errors, setErrors] = useState({});
    const [showNewPassword, setShowNewPassword] = useState(false);

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // New password requirements

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

    const toggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newErrors = {};

        // Check if new password meets the requirements
        if (!passwordRegex.test(formData.new_password)) {
            newErrors.new_password = 'Password must be at least 8 characters long and contain both letters and numbers.';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            dispatch(changePassword({
                new_password: formData.new_password,
                old_password: formData.old_password
            }));
            console.log('Form submitted:', formData);
        }
    };

    return (
      <div className={styles.formcontainer}>
        <hr className={styles.hr} />
        <form onSubmit={handleSubmit}>
          <div className={`form-group ${styles.forms}`}>
            <label htmlFor="old_password">
              <p>Old Password</p>
              <Password
                formData={formData}
                setFormData={setFormData}
                errors={errors}
                setErrors={setErrors}
              />
            </label>

            <label htmlFor="new_password">
              <p>New Password</p>
              <div className="pass">
                <div
                  className={`inputSvg ${errors.new_password ? "error" : ""}`}
                  onClick={toggleNewPasswordVisibility}
                >
                  {showNewPassword ? closedeyesvg : eyesvg}
                </div>
                <input
                  type={showNewPassword ? "text" : "password"}
                  id="new_password"
                  name="new_password"
                  placeholder="Enter new password"
                  value={formData.new_password || ""}
                  onChange={handleChange}
                  className={errors.new_password ? "error" : ""}
                />
              </div>
              {errors.new_password && (
                <div className="error-message">
                  {warningsvg} {errors.new_password}
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
              variant={status === "loading" ? "grey" : "blue"}
              label={status === "loading" ? "Saving..." : "Save changes"}
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
