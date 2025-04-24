import { useEffect, useState } from "react";
import Button from "../Button";
import Password from "../Forms/Password";
import { warningsvg, eyesvg, closedeyesvg } from "../../assets/svg/svgimages";
import styles from "./EditProfileForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../store/slices/profileSlice";

const PasswordForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    old_password: "",
    new_password: "",
  });
  
  const [errors, setErrors] = useState({});
  const [showNewPassword, setShowNewPassword] = useState(false);
  
  // Получаем состояние из Redux
  const { changePasswordError } = useSelector(state => state.profile.errors);
  const { changePasswordStatus } = useSelector(state => state.profile.status);


  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const togglePasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const goBack = () => {
    navigate("/profile/");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = {};

    // Валидация пароля
    if (!formData.old_password) {
      newErrors.old_password = "Old password is required";
    }

    if (!passwordRegex.test(formData.new_password)) {
      newErrors.new_password = 
        "Password must be at least 8 characters long and contain both letters and numbers";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await dispatch(changePassword({
        old_password: formData.old_password,
        new_password: formData.new_password
      })).unwrap();
      
    } catch (error) {
      // Ошибка уже будет сохранена в Redux store
      console.error("Password change error:", error);
      if (changePasswordError?.message == error.message) {
        setErrors({old_password: "Old password is incorrect"});
        // newErrors.old_password = "Old password is incorrect";
      }
    }
    console.log("Change password status:", changePasswordStatus);
    if (changePasswordStatus === 'idle' || changePasswordStatus === 'succeeded') {
      formData.old_password = ''
      formData.new_password = ''
    }
  };

  // Для отладки
  useEffect(() => {
    console.log("Current errors:", {
      clientErrors: errors,
      serverErrors: changePasswordError,
    });
  }, [errors, changePasswordError]);

  return (
    <div className={styles.formcontainer}>
      <hr className={styles.hr} />
      <form onSubmit={handleSubmit}>
        <div className={`form-group ${styles.forms}`}>
          {/* Поле старого пароля */}
          <label htmlFor="old_password">
            <p>Old Password</p>
            <Password
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              setErrors={setErrors}
            />
            {/* {errors.old_password && (
              <div className="error-message">
                {warningsvg} {errors.old_password}
              </div>
            )} */}
            {changePasswordError?.old_password && (
              <div className="error-message">
                {warningsvg} {changePasswordError.old_password[0]}
              </div>
            )}
          </label>

          {/* Поле нового пароля */}
          <label htmlFor="new_password">
            <p>New Password</p>
            <div className="pass">
              <div
                className={`inputSvg ${errors.new_password ? "error" : ""}`}
                onClick={togglePasswordVisibility}
              >
                {showNewPassword ? closedeyesvg : eyesvg}
              </div>
              <input
                type={showNewPassword ? "text" : "password"}
                id="new_password"
                name="new_password"
                placeholder="Enter new password"
                value={formData.new_password}
                onChange={handleChange}
                className={errors.new_password ? "error" : ""}
              />
            </div>
            {errors.new_password && (
              <div className="error-message">
                {warningsvg} {errors.new_password}
              </div>
            )}
          </label>
        </div>

        <hr className={styles.hr} />
        
        {/* Кнопки и статус */}
        <div className={styles.btncontBig}>
          <div className={styles.btncont}>
            <Button
              variant="outline-red"
              label="Close"
              labelPosition="left"
              iconType="crossbtn"
              onClick={goBack}
            />
            
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Button
                variant={changePasswordStatus === 'loading' ? "grey" : "blue"}
                label={changePasswordStatus === 'loading' ? "Saving..." : "Save changes"}
                labelPosition="left"
                iconType="checkMark"
                type="submit"
                disabled={changePasswordStatus === 'loading'}
              />
              
              {changePasswordStatus === 'succeeded' && (
                <p style={{ color: "green", fontSize: "16px" }}>Password changed successfully!</p>
              )}
              
              {changePasswordStatus === 'failed' && changePasswordError?.detail && (
                <p style={{ color: "red", fontSize: "16px" }}>{changePasswordError.detail}</p>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PasswordForm;
