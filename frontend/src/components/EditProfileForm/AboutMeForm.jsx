import { useState } from "react";
import Button from "../Button"
import AboutMe from "../Forms/AboutMe"
import { useNavigate } from "react-router-dom";
import { warningsvg } from "../../assets/svg/svgimages";

import styles from "./EditProfileForm.module.css"

import { useDispatch } from "react-redux";
import { updateUserProfile } from "../../store/slices/profileSlice";


const AboutMeForm = ({about, status}) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        aboutMe: !about?  "" : about,
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
         await dispatch(updateUserProfile({about_me:formData.aboutMe})).unwrap();
        } catch (error) {
          console.log('Update profile failed:', error);
        }
    };

    const goBack = () => {
        navigate("/profile/1")
    };

    return (
      <div className={styles.formcontainer}>
        <hr className={styles.hr} />
        <form onSubmit={handleSubmit}>
          {status === "failed" && (
            <div className="error-message">
              {warningsvg} Something went wrong
            </div>
          )}
          <div className={`form-group ${styles.forms} ${styles.textarea}`}>
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
              variant={
                status.updateUserProfileStatus === "loading"
                  ? "grey"
                  : "blue"
              }
              label={
                status.updateUserProfileStatus === "loading"
                  ? "Loading"
                  : "Save changes"
              }
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