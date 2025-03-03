import { useState, useEffect } from "react";

import Button from "../Button";
import Password from "../Forms/Password";
import Email from "../Forms/Email";
import { useNavigate } from "react-router-dom";
import Oauth from "../Oauth/Oauth";
import {
  googleIconsvg,
  facebooksvg,
  applesvg,
  microsoftsvg,
} from "../../assets/svg/svgimages";

import { loginUser } from "../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Login = ({ onModalClose }) => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.user);
  const apiError = useSelector((state) => state.user.errors.loginError);

  const [formData, setFormData] = useState({
    email: "",
    old_password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({
    email: "",
    old_password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    setErrors({
      ...errors,
      [name]: "",
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

    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }

    if (!formData.old_password) {
      newErrors.old_password = "Password is required";
      valid = false;
    }

    if (valid) {
      dispatch(
        loginUser({ email: formData.email, password: formData.old_password })
      );
    } else {
      setErrors(newErrors);
    }
  };

  const handleGoRegistration = () => {
    navigate("/registration");
  };

  const handleForgotPassword = () => {
    navigate("/reset-password");
  };

  useEffect(() => {
    if (apiError && apiError.non_field_errors) {
      setErrors({
        ...errors,
        email: apiError.non_field_errors[0],
      });
    } else {
      setErrors({
        ...errors,
        email: "",
      });
    }
  }, [apiError]);

  useEffect(() => {
    if (status.loginStatus === "succeeded") {
      setErrors({
        email: "",
        old_password: "",
      });
      navigate(-1);
    }
  }, [status, navigate]);

  return (
    <div className="popup-content">
      <div className="closebtn cross">
        <Button
          variant="transparent"
          iconType="crossbtn"
          color="white"
          onClick={onModalClose}
        />
      </div>
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
              <Oauth />
              <div className="underform">
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
                <button
                  className="forgot-password-btn"
                  type="button"
                  onClick={handleForgotPassword}
                >
                  Forgot password
                </button>
              </div>
              <div className="form-button-cont">
                <Button
                  label={
                    status.loginStatus === "loading"
                      ? "Signing in..."
                      : "Sign In"
                  }
                  iconType="arrowRight"
                  variant={status.loginStatus === "loading" ? "grey" : "blue"}
                  type="submit"
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
            <Oauth icon={googleIconsvg} name={"Sign in with Google"} />
            {/* <button className="auth-button">
              {googleIconsvg} Sign in with Google
            </button>
            <button className="auth-button">
              {facebooksvg} Sign in with Facebook
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
