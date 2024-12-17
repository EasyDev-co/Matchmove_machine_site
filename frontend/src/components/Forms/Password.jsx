import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { eyesvg, warningsvg, closedeyesvg } from "../../assets/svg/svgimages";

const Password = ({ formData, setFormData, errors, setErrors }) => {

  const location = useLocation();
  
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="pass">
        <div className={`inputSvg ${errors.password ? "error" : ""}`} onClick={togglePasswordVisibility}>
          {showPassword ? closedeyesvg : eyesvg}
        </div>
        <input
          type={showPassword ? "text" : "password"}
          id="old_password"
          name="old_password"
          placeholder="Password"
          autoComplete="current-password"
          value={formData.old_password || ""}
          onChange={handleChange}
          className={errors.password ? "error" : ""}
        />
      </div>
      {errors.old_password? (
        <div className="error-message">
          {warningsvg} {errors.old_password}
        </div>
      ): location.pathname !== "/authorization"?<div className="pass-message">
        Password must be at least 8 characters, contain latin letters and numbers
    </div>: ""}
    </>
  );
};

export default Password;