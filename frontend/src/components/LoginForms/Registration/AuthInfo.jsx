import { useState } from "react";
import Button from "../../Button";
import Email from "../../Forms/Email";
import Password from "../../Forms/Password";
import Name from "../../Forms/Name";
import Occupation from "../../Forms/Occupation";

import { useDispatch } from "react-redux";
import { registerUser } from "../../../store/userSlice";

const AuthInfo = ({ handleNext }) => {

  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    occupation: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    occupation: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
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

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
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

    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters, contain letters and numbers';
      valid = false;
    }

    if (!formData.occupation) {
      newErrors.occupation = 'Occupation is required';
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      console.log('Form data submitted:', {username:formData.name, email:formData.email, password:formData.password});
      dispatch(registerUser({username:formData.name, email:formData.email, password:formData.password}))
      handleNext();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <Name
          formData={{ name: formData.name }}
          handleChange={handleChange}
          errors={errors}
        />
        <Email
          formData={{ email: formData.email }}
          handleChange={handleChange}
          errors={errors}
          validateEmail={validateEmail}
        />
        <Password
          formData={{ password: formData.password }}
          setFormData={setFormData}
          errors={errors}
          setErrors={setErrors}
        />
        <Occupation
          formData={{ occupation: formData.occupation }}
          handleChange={handleChange}
          errors={errors}
        />
        <Button variant="blue" iconType="arrowRight" label="Next" type="submit" />
      </div>
    </form>
  );
};

export default AuthInfo;
