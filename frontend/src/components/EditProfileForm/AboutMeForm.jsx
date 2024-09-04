import { useState } from "react";
import Button from "../Button"
import AboutMe from "../Forms/AboutMe"
import { useNavigate } from "react-router-dom";

import styles from "./EditProfileForm.module.css"


const AboutMeForm = () => {

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        aboutMe: 'Lorem ipsum dolor sit amet consectetur. Habitant quam eget mollis dui justo duis euismod sit quis. Velit ullamcorper arcu sit pellentesque dictum morbi leo cursus tortor. Facilisi sem neque convallis ultricies ullamcorper metus. Senectus quam interdum dictum consectetur vestibulum.Lorem ipsum dolor sit amet consectetur. Habitant quam eget mollis dui justo duis euismod sit quis. Velit ullamcorper arcu sit pellentesque dictum morbi leo cursus tortor.',
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