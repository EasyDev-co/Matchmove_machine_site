import { useEffect, useState } from "react";
import Input from "../Forms/Input";
import Button from "../Button";
import styles from "./EditProfileForm.module.css";
import { warningsvg } from "../../assets/svg/svgimages";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUserProfile } from "../../store/slices/profileSlice";

const SocialsForm = ({ profile, status }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    facebook: profile.facebook || "",
    X: profile.twitter || "",
    whatsapp: profile.whatsapp || "",
    telegram: profile.telegram || "",
    // twitter: profile.twitter || "",
    messenger: profile.messenger || "",
    linkedin: profile.linkedin || "",
    reddit: profile.reddit || "",
    instagram: profile.instagram || "",
    youtube: profile.youtube || "",
    vimeo: profile.vimeo || "",
  });

  const [errors, setErrors] = useState({});

  const [statusUpdate, setStatusUpdate] = useState(status);

    useEffect(() => {
      console.log(status)
      setStatusUpdate(status)
    }, [status]);


  const handleChange = (event) => {
    const { name, value } = event.target;

    // Check if the value is a social URL and add "https://" if missing
    if (value && !/^https?:\/\//.test(value)) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: `https://${value}`,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation(); // Дополнительная защита от всплытия
  
    // Валидация (если нужно)
    const newErrors = {};
    // Здесь может быть ваша логика валидации
    // Например:
    // if (!formData.facebook) newErrors.facebook = 'Facebook URL is required';
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    try {
      // Формируем данные для отправки
      const profileData = {
        facebook: formData.facebook || null,  // Явно преобразуем undefined в null
        twitter: formData.X || null,
        linkedin: formData.linkedin || null,
        reddit: formData.reddit || null,
        instagram: formData.instagram || null,
        youtube: formData.youtube || null,
        vimeo: formData.vimeo || null,
        telegram: formData.telegram || null,
        whatsapp: formData.whatsapp || null,
        messenger: formData.messenger || null
      };
  
      console.log('Отправляемые данные:', profileData);
  
      // Отправляем запрос и ждем завершения
      await dispatch(updateUserProfile(profileData)).unwrap();
  
      console.log('Профиль успешно обновлен');
      // Можно добавить уведомление об успехе или редирект
    } catch (error) {
      console.error('Ошибка при обновлении профиля:', error);
      
      if (error.payload) {
        // Обработка ошибок от сервера
        setErrors(error.payload);
      } else {
        // Обработка сетевых ошибок
        setErrors({ general: error.message || 'Произошла ошибка' });
      }
    }
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const newErrors = {};

  //   console.log(formData)

  //   // If there are errors, set them in state
  //   if (Object.keys(newErrors).length > 0) {
  //     setErrors(newErrors);
  //     return; // Stop form submission
  //   }

  //   // If no errors, proceed with dispatch
  //   dispatch(
  //     updateUserProfile({
  //       facebook: formData.facebook,
  //       twitter: formData.twitter,
  //       linkedin: formData.linkedin,
  //       reddit: formData.reddit,
  //       instagram: formData.instagram,
  //       youtube: formData.youtube,
  //       vimeo: formData.vimeo,
  //       telegram: formData.telegram,
  //     })
  //   );
  //   console.log('проверка2')
  // };

  const goBack = () => {
    navigate("/profile/");
  };

  return (
    <div className={`${styles.formcontainer} `}>
      <hr className={styles.hr} />
      <form onSubmit={handleSubmit}>
        {status === "failed" && (
          <div className="error-message">{warningsvg} Something went wrong</div>
        )}
        <div className={`form-group ${styles.forms} ${styles.socialtoggle}`}>
          {[
            "facebook",
            "telegram",
            "instagram",
            "whatsapp",
            "linkedin",
            "messenger",
            "youtube",
            "X",
            "reddit",
            "vimeo",
          ].map((social) => {
            const websiteExample = `https://www.${social}.com/yourprofile`;
            return (
              <label key={social} htmlFor={social}>
                <p>{social.charAt(0).toUpperCase() + social.slice(1)}</p>
                <Input
                  name={social}
                  placeholder={`${websiteExample}`}
                  value={formData[social]}
                  onChange={handleChange}
                  errors={errors}
                />
              </label>
            );
          })}
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Button
              variant={status === "loading" ? "grey" : "blue"}
              label={status === "loading" ? "Saving..." : "Save changes"}
              labelPosition="left"
              iconType="checkMark"
              type="submit"
            />
            {statusUpdate === 'succeeded' && (
            <p style={{ color: "green", fontSize: "16px" }}>Profile updated</p>
            )}
          </div>
        </div>
        </div>
      </form>
    </div>
  );
};

export default SocialsForm;
