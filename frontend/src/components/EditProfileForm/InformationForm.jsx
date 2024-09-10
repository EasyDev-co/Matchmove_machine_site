import { useState } from "react";
import styles from "./EditProfileForm.module.css"
import Name from "../Forms/Name"
import Occupation from "../Forms/Occupation";
import Email from "../Forms/Email";
import Website from "../Forms/Website";
import Portfolio from "../Forms/Portfolio";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

const InformationForm = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: 'Greg',
    email: 'greg-grids@machine.com',
    occupation: 'editor',
    website: '', 
    portfolio: '', 
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    occupation: '',
    website: '', // Add website error field
    portfolio: '', // Add portfolio error field
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

  const validateURL = (url) => {
    const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,4}\/?$/;
    return urlRegex.test(url);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    let newErrors = {};

    if (!formData.name) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
      valid = false;
    }

    if (!formData.occupation) {
      newErrors.occupation = 'Occupation is required';
      valid = false;
    }

    if (formData.website && !validateURL(formData.website)) {
      newErrors.website = 'Invalid website URL';
      valid = false;
    }

    if (formData.portfolio && !validateURL(formData.portfolio)) {
      newErrors.portfolio = 'Invalid portfolio URL';
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      console.log('Form data submitted:', formData);
    }
  };

  const goBack =()=>{
    navigate("/profile/1")
  }

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
};

export default InformationForm;
