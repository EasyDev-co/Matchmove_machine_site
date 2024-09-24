import { useState } from "react";
import Input from "../Forms/Input"
import Button from "../Button";
import styles from "./EditProfileForm.module.css"
import { warningsvg } from "../../assets/svg/svgimages";

import { useNavigate } from "react-router-dom";
import { useDispatch} from "react-redux";
import { updateUserProfile } from "../../store/slices/profileSlice";

const SocialsForm = ({ profile, status }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        facebook: profile.facebook || '',
        twitter: profile.twitter || '',
        whatsapp: '',
        telegram: '',
        messenger: '',
        linkedin: profile.linkedin || '',
        reddit:profile.reddit || '', 
        instagram:profile.instagram ||'', 
        youtube:profile.youtube ||'',
        vimeo:profile.vimeo ||''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        // Clear error for the field being changed
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));
    };

    const validateURL = (url) => {
        const regex = /^(https?:\/\/[^\s/$.?#].[^\s]*)$/; 
        return regex.test(url);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newErrors = {};

        // Validate each URL field
        Object.keys(formData).forEach((key) => {
            if (formData[key] && !validateURL(formData[key])) {
                newErrors[key] = 'Please use a valid URL format (http:// or https://)';
            }
        });

        // If there are errors, set them in state
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return; // Stop form submission
        }

        // If no errors, proceed with dispatch
        dispatch(updateUserProfile({
            facebook: formData.facebook,
            twitter: formData.twitter,
            linkedin: formData.linkedin,
            reddit: formData.reddit, 
            instagram: formData.instagram, 
            youtube: formData.youtube,
            vimeo:formData.vimeo
        }));
    };

    const goBack = () => {
        navigate("/profile/1")
    };

    return (
      <div className={`${styles.formcontainer} `}>
        <hr className={styles.hr} />
        <form onSubmit={handleSubmit}>
          {status === "failed" && (
            <div className="error-message">
              {warningsvg} Something went wrong
            </div>
          )}
          <div className={`form-group ${styles.forms} ${styles.socialtoggle}`}>
            {[
              "facebook",
              "twitter",
              "whatsapp",
              "telegram",
              "messenger",
              "linkedin",
              "reddit",
              "instagram",
              "youtube",
              "vimeo",
            ].map((social) => (
              <label key={social} htmlFor={social}>
                <p>{social.charAt(0).toUpperCase() + social.slice(1)}</p>
                <Input
                  name={social}
                  placeholder={`${
                    social.charAt(0).toUpperCase() + social.slice(1)
                  }`}
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

export default SocialsForm;