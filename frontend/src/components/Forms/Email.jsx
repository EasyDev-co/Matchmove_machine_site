import React, { useState } from 'react';
import { eyesvg, warningsvg, closedeyesvg } from "../../assets/svg/svgimages";

const Email = ({ formData, handleChange, errors, validateEmail }) => {
  const handleEmailChange = (e) => {
    const { name, value } = e.target;
    handleChange(e);

    if (!validateEmail(value)) {
      errors.email = 'Invalid email format'; 
    } else {
      errors.email = ''; 
    }
  };

  return (
    <>
      <input
        type="text"
        id="email"
        name="email"
        placeholder="E-mail"
        value={formData.email}
        onChange={handleEmailChange}
        className={errors.email ? "error" : ""}
      />
      {errors.email && (
        <div className="error-message">
          {warningsvg} {errors.email}
        </div>
      )}
    </>
  );
};

export default Email;