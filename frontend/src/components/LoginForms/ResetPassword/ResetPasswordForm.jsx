
import { useState } from "react";

import Email from "../../Forms/Email";
import Button from "../../Button";

import { setEmail } from "../../../store/userSlice";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../../store/userSlice";

const ResetPasswordForm = ({handlePasswordReset}) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: '' });
  const [errors, setErrors] = useState({ email: '' });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = formData.email;
    let newErrors = { email: '' };
  
    // Validate email only on submit
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Invalid email format';
    }
  
    setErrors(newErrors);
  
    // If valid, dispatch the reset password action
    if (!newErrors.email) {
      try {
        await dispatch(resetPassword(email)).unwrap(); // Use unwrap for error handling
        dispatch(setEmail(formData.email))
        handlePasswordReset()
      } catch (error) {
        // Assuming error structure comes from the backend
        const backendErrors = error; 
        let apiErrors = {};
  
        // Check for specific backend errors
        if (backendErrors.email) {
          apiErrors.email = backendErrors.email[0]; // Adjust based on actual backend response
        }
  
        // Update local errors state
        setErrors(prevErrors => ({
          ...prevErrors,
          ...apiErrors,
        }));
      }
    }
  };
  return (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <h3 className="h3-medium">
                Enter your registered email address and we'll send you a
                password reset link
              </h3>
              <Email
                formData={formData}
                handleChange={handleChange}
                errors={errors}
                validateEmail={validateEmail}
              />
              <Button variant="blue" iconType="arrowRight" label="Reset" type="submit" />
            </div>
          </form>
  );
};

export default ResetPasswordForm;