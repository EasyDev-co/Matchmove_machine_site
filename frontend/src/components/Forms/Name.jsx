import React, { useState } from 'react';
import { eyesvg, warningsvg, closedeyesvg } from "../../assets/svg/svgimages";


const Name = ({ formData, handleChange, errors }) => {
    return (
      <>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? "error" : ""}
        />
        {errors.name && (
          <div className="error-message">
            {warningsvg} {errors.name}
          </div>
        )}
      </>
    );
  };
  
  export default Name;