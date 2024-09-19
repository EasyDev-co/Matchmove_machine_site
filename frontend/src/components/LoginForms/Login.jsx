import { useState, useEffect } from "react";
import {
  googleIconsvg,
  facebooksvg,
  applesvg,
  microsoftsvg,
} from "../../assets/svg/svgimages";
import Button from "../Button";
import Password from "../Forms/Password";
import Email from "../Forms/Email";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Login = ({ onModalClose }) => {

  const dispatch = useDispatch();
  const {error, status} = useSelector(state=> state.user)

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

    setErrors(newErrors);

    if (valid) {
      console.log("Form data submitted:", formData);
      dispatch(
        loginUser({ email: formData.email, password: formData.old_password })
      );
    }
  };

  const handleGoRegistration = () => {
    navigate("/registration");
  };

  const handleForgotPassword = () => {
    navigate("/reset-password");
  };

  useEffect(() => {
    if (error && error.non_field_errors) {
      setErrors({
        ...errors,
        email: error.non_field_errors[0],
      });
    } else {
      setErrors({
        ...errors,
        email: "",
      });
    }
  }, [error]);

  useEffect(()=>{
    if(status==="succeeded"){
      setErrors({
        email: "",
        old_password: "",
      })
      navigate(-1)
    }
  }, [status, navigate])

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
                  label="Sign In"
                  iconType="arrowRight"
                  variant="blue"
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
            <button className="auth-button">
              {googleIconsvg} Sign in with Google
            </button>
            <button className="auth-button">
              {facebooksvg} Sign in with Facebook
            </button>
            <button className="auth-button">
              {applesvg} Sign in with Apple
            </button>
            <button className="auth-button">
              {microsoftsvg}Sign in with Microsoft
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
