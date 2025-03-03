import { useState } from "react";
import styles from "./EditProfileForm.module.css"
import Name from "../Forms/Name"
import Occupation from "../Forms/Occupation";
import Email from "../Forms/Email";
import Website from "../Forms/Website";
import Portfolio from "../Forms/Portfolio";
import Button from "../Button";import { warningsvg } from "../../assets/svg/svgimages";
import {deleteUserAccount} from "../../store/userSlice.js";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector  } from "react-redux";
import { updateUserProfile } from "../../store/slices/profileSlice";

const InformationForm = ({ profile, status, picture }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { deleteAccountStatus, deleteAccountError } = useSelector((state) => state.user.status);


  const [formData, setFormData] = useState({
    name: profile.username || '',
    email: profile.email || '',
    occupation: profile.occupation|| '',
    website: profile.website || '',
    portfolio: profile.portfolio || '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    occupation: '',
    website: '',
    portfolio: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Check if the field is website or portfolio and add "https://" if missing
    if ((name === "website" || name === "portfolio") && value && !/^https?:\/\//.test(value)) {
      setFormData({
        ...formData,
        [name]: `https://${value}`,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    let newErrors = {};

    // Name validation
    if (!formData.name) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      const userProfileUpdate = {
        username: formData.name,
        email: formData.email,
        website: formData.website,
        portfolio: formData.portfolio,
        occupation: formData.occupation,
      };

      try {
        await dispatch(updateUserProfile(userProfileUpdate)).unwrap();
      } catch (error) {
        // Handle error (e.g., show an error message)
        console.log('Update profile failed:', error);
      }
    }
  };

  const goBack = () => {
    navigate('/profile/');
  };

  const handleDeleteAccount = async () => {
    const confirmation = window.confirm('Вы уверены, что хотите удалить аккаунт? Это действие нельзя отменить.');
    if (confirmation) {
      try {
        await dispatch(deleteUserAccount()).unwrap();
        alert('Аккаунт успешно удален!');
        navigate('/'); // Перенаправляем на главную страницу
      } catch (error) {
        console.error('Ошибка при удалении аккаунта:', error);
        alert('Не удалось удалить аккаунт. Пожалуйста, попробуйте снова.');
      }
    }
  };

  // const handleDeleteAccount = () => {
  //   dispatch(deleteUserAccount())
  //     .unwrap()
  //     .then(() => {
  //       // dispatch(resetProfile())
  //       navigate("/");
  //       window.location.reload();
  //     })
  //     .catch((error) => {
  //       console.log("Logout failed", error); 
  //     });
  // };

  return (
    <div className={styles.formcontainer}>
      <hr className={styles.hr} />
      <form onSubmit={handleSubmit}>
        {status === 'failed' && (
          <div className="error-message">
            {warningsvg} Something went wrong
          </div>
        )}
        <div className={`form-group ${styles.forms}`}>
          <label htmlFor="name">
            <p>Name</p>
            <Name
              formData={{ name: formData.name }}
              handleChange={handleChange}
              errors={errors}
            />
          </label>

          <label htmlFor="email">
            <p>Email</p>
            <Email
              formData={{ email: formData.email }}
              handleChange={handleChange}
              errors={errors}
              validateEmail={validateEmail}
            />
          </label>

          <label htmlFor="website">
            <p>Website</p>
            <Website
              formData={{ website: formData.website }}
              handleChange={handleChange}
            />
          </label>

          <label htmlFor="portfolio">
            <p>Portfolio</p>
            <Portfolio
              formData={{ portfolio: formData.portfolio }}
              handleChange={handleChange}
            />
          </label>

          <label htmlFor="occupation">
            <p>Occupation</p>
            <Occupation
              formData={{ occupation: formData.occupation }}
              handleChange={handleChange}
              errors={errors}
            />
          </label>
        </div>
        <hr className={styles.hr} />
        <div className={styles.btncontBig}>
        <div className={styles.btncont}>
          <Button
            variant="outline-red"
            label="Close"
            labelPosition="left"
            iconType="crossbtn"
            onClick={goBack}
          />
          <Button
            variant={status === "loading" ? "grey" : "blue"}
            label={status === "loading" ? "Saving..." : "Save changes"}
            labelPosition="left"
            iconType="checkMark"
            type="submit"
          />
        </div>
        <div>
        <Button
            variant="outline-red"
            label={deleteAccountStatus  === "loading" ? "deleted..." : "Delete account"}
            labelPosition="left"
            iconType="crossbtn"
            onClick={handleDeleteAccount}
          />
        </div>
        </div>
      </form>
    </div>
  );
};

export default InformationForm;