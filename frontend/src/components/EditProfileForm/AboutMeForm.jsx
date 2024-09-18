import { useState } from "react";
import Button from "../Button"
import AboutMe from "../Forms/AboutMe"
import { useNavigate } from "react-router-dom";

import styles from "./EditProfileForm.module.css"

import { useDispatch } from "react-redux";
import { updateUserProfile } from "../../store/slices/profileSlice";


const AboutMeForm = ({about}) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        aboutMe: about,
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(updateUserProfile({about_me:formData.aboutMe}))
        console.log('Form submitted:', formData);
    };

    const goBack = () => {
        navigate("/profile/1")
    };

    return (
      <div className={styles.formcontainer}>
         <hr className={styles.hr} />
        <form onSubmit={handleSubmit}>
          <div  className={`form-group ${styles.forms} ${styles.textarea}`}>
            <label htmlFor="aboutMe">
              <p>Description</p>
              <AboutMe formData={formData} handleChange={handleChange} />
            </label>

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

export default AboutMeForm;