
import { useState } from "react";

import Email from "../../Forms/Email";
import Button from "../../Button";

const ResetPasswordForm = ({handlePasswordReset}) => {
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

    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    let newErrors = {};

    // validat email
    if (!formData.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      console.log('Form data submitted:', formData);
      handlePasswordReset()
      // form submist
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
              <Button variant="blue" iconType="arrowRight" label="Reset" />
            </div>
          </form>
  );
};

export default ResetPasswordForm;