import { useState } from "react";
import styles from "./EditProfileForm.module.css"
import Name from "../Forms/Name"
import Occupation from "../Forms/Occupation";
import Email from "../Forms/Email";
import Website from "../Forms/Website";
import Portfolio from "../Forms/Portfolio";
import Button from "../Button";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUserProfile } from "../../store/slices/profileSlice";

const InformationForm = ({profile, picture}) => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    name: profile.username || "",
    email: profile.email || "",
    occupation: '',
    website: profile.website || "", 
    portfolio: profile.portfolio || "", 
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    occupation: '',
    website: '',
    portfolio: '', 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    let newErrors = {};
  
    // Name validation
    if (!formData.name) {
      newErrors.name = 'Name is required';
      valid = false;
    }
  
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
      valid = false;
    }
  
    setErrors(newErrors);
  
    if (valid) {
      const userProfileUpdate = {
        username: formData.name,
        email: formData.email,
        website: formData.website,
        portfolio: formData.portfolio
      };
      dispatch(updateUserProfile(userProfileUpdate));
      console.log('Form data submitted:', userProfileUpdate);
    }
  };


  const goBack =()=>{
    navigate("/profile/1")
  }

  if(profile){

  return (
    <div className={styles.formcontainer}>
      <hr className={styles.hr}/>
      <form onSubmit={handleSubmit}>
        <div className={`form-group ${styles.forms}`}>
          <label htmlFor="name">
            <p>Name</p>
            <Name
              formData={{ name: formData.name }}
              handleChange={handleChange}
              errors={errors}
            />
          </label>

          <label htmlFor="email">
            <p>Email</p>
            <Email
              formData={{ email: formData.email }}
              handleChange={handleChange}
              errors={errors}
              validateEmail={validateEmail}
            />
          </label>

          <label htmlFor="website">
            <p>Website</p>
            <Website
              formData={{ website: formData.website }}
              handleChange={handleChange}
            />
          </label>

          <label htmlFor="portfolio">
            <p>Portg</p>
            <Portfolio
              formData={{ portfolio: formData.portfolio }}
              handleChange={handleChange}
            />
          </label>

          <label htmlFor="occupation">
            <p>Occupation</p>
            <Occupation
              formData={{ occupation: formData.occupation }}
              handleChange={handleChange}
              errors={errors}
            />
          </label>
        </div>
        <hr className={styles.hr}/>
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
}
};

export default InformationForm;
