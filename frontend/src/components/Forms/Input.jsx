import React from 'react';
import {  warningsvg } from "../../assets/svg/svgimages";

const Input = ({ name, placeholder, value, onChange, errors }) => {
    return (
        <>
            <input
                type="text"
                id={name}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={errors[name] ? 'error' : ''}
            />
            {errors[name] && (
                <div className="error-message">
                    {warningsvg} {errors[name]}
                </div>
            )}
        </>
    );
};

export default Input;