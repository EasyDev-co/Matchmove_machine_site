import React, { useState } from 'react';
import { eyesvg, warningsvg, closedeyesvg } from "../../assets/svg/svgimages";

const Password = ({ formData, setFormData, errors, setErrors }) => {
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
          id="password"
          name="password"
          placeholder="Password"
          value={formData.password || ''}
          onChange={handleChange}
          className={errors.password ? "error" : ""}
        />
      </div>
      {errors.password && (
        <div className="error-message">
          {warningsvg} {errors.password}
        </div>
      )}
    </>
  );
};

export default Password;