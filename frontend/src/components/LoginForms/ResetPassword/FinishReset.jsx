import { useState } from "react";
import Button from "../../Button";
import Password from "../../Forms/Password";
import { warningsvg } from "../../../assets/svg/svgimages";
import { eyesvg } from "../../../assets/svg/svgimages";
import { closedeyesvg } from "../../../assets/svg/svgimages";

import { changeResetPassword } from "../../../store/userSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const FinishReset = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [showNewPassword, setShowNewPassword] = useState(false);
  const email = useSelector((state) => state.user.email);

  const [formData, setFormData] = useState({
    old_password: "",
    confirm_password: "",
    code: "",
  });
  const [errors, setErrors] = useState({});
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = {};

    // Check if passwords meets the requirements
    if (!passwordRegex.test(formData.old_password)) {
      newErrors.old_password =
        "Password must be at least 8 characters long and contain both letters and numbers.";
    }

    if (!passwordRegex.test(formData.confirm_password)) {
      newErrors.confirm_password =
        "Password must be at least 8 characters long and contain both letters and numbers.";
    }
    if (formData.confirm_password && formData.old_password) {
      if (formData.confirm_password !== formData.old_password) {
        newErrors.confirm_password = "Passwords do not match.";
      }
    }

    if (formData.code.length <= 0) {
      newErrors.code = "Code is requaired";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      try {
        await dispatch(
          changeResetPassword({
            email,
            new_password: formData.old_password,
            confirm_password: formData.confirm_password,
            code: formData.code,
          })
        ).unwrap();
        navigate("/");
      } catch (error) {
        console.log(error.detail);
      }
    }
  };

  return (
    <div className="form-group">
      <h3 className="h3-medium">
        We’ve sent a password reset code to your email address. Please check
        your inbox and enter it below.
      </h3>
      <form onSubmit={handleSubmit} className="form-group">
        <label htmlFor="code">
          <div className="pass" style={{ marginBottom: "10px" }}>
            <input
              type="text"
              id="code"
              name="code"
              placeholder="Confirmation code"
              value={formData.code || ""}
              onChange={handleChange}
              className={errors.code ? "error" : ""}
            />
          </div>
          {errors.code && (
            <div className="error-message">
              {warningsvg} {errors.code}
            </div>
          )}
        </label>

        <Password
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          setErrors={setErrors}
        />

        <label htmlFor="confirm_password">
          <div className="pass" style={{ marginBottom: "10px" }}>
            <div
              className={`inputSvg ${errors.new_password ? "error" : ""}`}
              onClick={toggleNewPasswordVisibility}
            >
              {showNewPassword ? closedeyesvg : eyesvg}
            </div>
            <input
              type={showNewPassword ? "text" : "password"}
              id="confirm_password"
              name="confirm_password"
              placeholder="Confirm password"
              value={formData.confirm_password || ""}
              onChange={handleChange}
              className={errors.confirm_password ? "error" : ""}
            />
          </div>
          {errors.confirm_password && (
            <div className="error-message">
              {warningsvg} {errors.confirm_password}
            </div>
          )}
        </label>
        <Button
          variant="blue"
          iconType="checkMark"
          label="Apply"
          type="submit"
        />
      </form>
    </div>
  );
};

export default FinishReset;
