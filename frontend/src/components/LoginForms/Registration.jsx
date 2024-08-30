import { useState } from "react";
import { eyesvg, warningsvg, closesvg } from "../../assets/svg/svgimages";
import Button from "../Button";



const Registration= ({ onClose }) => {

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        rememberMe: false,
      });
    
      const [errors, setErrors] = useState({
        username: '',
        password: '',
      });
    
      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
          ...formData,
          [name]: type === 'checkbox' ? checked : value,
        });
    
        // Clear the error message for the field when the user starts typing
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
        } else if (!validateEmail(formData.username)) {
          newErrors.username = 'Invalid email format';
          valid = false;
        }
    
        if (!formData.password) {
          newErrors.password = 'Password is required';
          valid = false;
        }
    
        setErrors(newErrors);
    
        if (valid) {
          // Handle form submission logic here
          console.log('Form data submitted:', formData);
        }
      };

      
  return (
    <div className="authorization-popup">
      <div className="popup-content">
        <div className="login-form inputsbg">
          <div className="login-wrap">
            <h2 className="h2-medium">Log in to your account</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="E-mail or login"
                  value={formData.username}
                  onChange={handleChange}
                  className={errors.username ? "error" : ""}
                />
                {errors.username && (
                  <div className="error-message">
                    {warningsvg} {errors.username}
                  </div>
                )}
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="E-mail or login"
                  value={formData.username}
                  onChange={handleChange}
                  className={errors.username ? "error" : ""}
                />
                {errors.username && (
                  <div className="error-message">
                    {warningsvg} {errors.username}
                  </div>
                )}
                <div className="pass">
                  <div className={`inputSvg ${errors.password ? "error" : ""}`}>
                    {eyesvg}
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className={errors.password ? "error" : ""}
                  />
                </div>
                {errors.password && (
                  <div className="error-message">
                    {warningsvg} {errors.password}
                  </div>
                )}
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
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Registration;
