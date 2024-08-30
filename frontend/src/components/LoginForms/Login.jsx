import { useState } from "react";
import {closesvg, googleIconsvg, facebooksvg, applesvg, microsoftsvg } from "../../assets/svg/svgimages";
import Button from "../Button";
import Password from "../Forms/Password";
import Email from "../Forms/Email";
import { useNavigate } from "react-router-dom";


const Login = ({ onModalClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate()

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

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    let newErrors = {};

    if (!formData.username) {
      newErrors.username = 'Email is required';
      valid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.username = 'Invalid email format';
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      console.log('Form data submitted:', formData);
    }
  };

  const handleGoRegistration =()=>{
    navigate("/registration")
  }

  return (

      <div className="popup-content">
        <button className="closebtn" onClick={onModalClose}>{closesvg}</button>
        <div className="login-form inputsbg">
          <div className="login-wrap">
            <h2 className="h2-medium">Log in to your account</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">

              <Email
                  formData={formData}
                  handleChange={handleChange}
                  errors={errors}
                  validateEmail={validateEmail}
                />
                <Password
                  formData={formData}
                  setFormData={setFormData}
                  errors={errors}
                  setErrors={setErrors}
                />
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                  />
                  <label htmlFor="rememberMe">Remember me</label>
                </div>
                <div className="form-button-cont">
                  <Button
                    label="Sign In"
                    iconType="arrowRight"
                    variant="blue"
                  />
                  <Button
                    label="Register"
                    iconType="arrowRight"
                    variant="outline-grey"
                    type="button"
                    onClick={handleGoRegistration}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="login-form auth">
          <div className="login-wrap">
            <h2 className="h2-medium">Sign in with</h2>
            <div className="auth-buttons">
              <button className="auth-button">{googleIconsvg} Sign in with Google</button>
              <button className="auth-button">
              {facebooksvg} Sign in with Facebook
              </button>
              <button className="auth-button">{applesvg} Sign in with Apple</button>
              <button className="auth-button">{microsoftsvg}Sign in with Microsoft</button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Login;