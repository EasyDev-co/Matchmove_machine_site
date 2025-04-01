import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Input from "../../components/Forms/Input";
import Button from "../../components/Button";

import { postPayment } from "../../store/slices/paymentSlice";

import styles from "./CheckOut.module.css";

const fields = [
  { name: "description", placeholder: "Description" },
  { name: "first_line", placeholder: "First Line" },
  { name: "city", placeholder: "City" },
  { name: "postal_code", placeholder: "Postal Code" },
  { name: "region", placeholder: "Region" },
  { name: "country_code", placeholder: "Country Code" },
];

const Payment = ({ orderId }) => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.payment);

  const [values, setValues] = useState({
    description: "",
    first_line: "",
    city: "",
    postal_code: "",
    region: "",
    country_code: "",
  });
  const [errors, setErrors] = useState({});
  const [isChecked, setIsChecked] = useState(false);
  const [labelClass, setLabelClass] = useState(styles.checkboxLabel);

  // 1. Подключим Paddle.js динамически (можно и в public/index.html – см. комментарий ниже).
  useEffect(() => {
    if (!window.Paddle) {
      const script = document.createElement("script");
      script.src = "https://cdn.paddle.com/paddle/paddle.js";
      script.async = true;
      console.log('падла нет')
      script.onload = () => {
        // Скрипт загружен, можно (опционально) сразу инициализировать
        // window.Paddle?.Setup({ vendor: 189185 }); 
        Paddle.Initialize({ token: '5fb98e8e0d04f908df3af8ae742a53cb79927f7c2bd6d6e9a8' });
      };
      document.body.appendChild(script);
    } else {
      console.log('падл есть')
      // Если Paddle уже есть – инициализируем
      // window.Paddle.Setup({ vendor: 189185 });
      Paddle.Initialize({ token: '5fb98e8e0d04f908df3af8ae742a53cb79927f7c2bd6d6e9a8' });
    }
  }, []);

  // 2. Валидация полей
  const validateFields = () => {
    const newErrors = {};
    fields.forEach(({ name, placeholder }) => {
    //   if (!values[name]) {
    //     newErrors[name] = ${placeholder} is required;  ///ВАЖНЫЙ МОМЕНТ
    //   }
    });
    return newErrors;
  };

  // 3. Отслеживаем изменения в форме
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // 4. Чекбокс «Terms of use»
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
    if (e.target.checked) {
      setLabelClass(styles.checkboxLabel);
    }
  };

  // 5. Сабмит формы
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isChecked) {
      setLabelClass(styles.notActive); // Подсветка, что чекбокс не отмечен
      return;
    }

    const newErrors = validateFields();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const dataToSubmit = {
      order_id: orderId,
      address: { ...values },
    };

    try {
      // Отправляем запрос на бэкенд, где создаётся транзакция Paddle
      const resultAction = await dispatch(postPayment(dataToSubmit));
      // Если вы используете createAsyncThunk, можно делать:
      // const res = unwrapResult(resultAction);  // из RTK
      // либо просто читать resultAction.payload, зависит от настроек

      const { payload } = resultAction; 
      // Ожидаем, что payload имеет { checkout: { url: "..." } }
      const checkoutUrl = payload?.checkout?.url;
      const paymentId = payload?.id;
      if (!checkoutUrl) {
        console.error("No checkout URL returned from server");
        return;
      }

      console.log('проверка 1')

      // Убедимся, что Paddle подгрузился
      if (window?.Paddle) {
        // Инициализируем (на всякий случай, если не сделали в useEffect)
        window.Paddle.Setup({ vendor: 189185 });
        console.log('проверка 2')
        // Открываем поп-ап с оплатой через override
        window.Paddle.Checkout.open({
            // override: checkoutUrl,
            transactionId: paymentId,
            
            successCallback: (data) => {
              console.log("Paddle successCallback:", data);
              // Можно дождаться Webhook на сервере или перенаправить пользователя
            },

            closeCallback: () => {
              console.log("Paddle checkout closed.");
            },
          });
        } else {
          // Если по какой-то причине Paddle не прогрузился
          console.error("Paddle.js not found in window");
        }
      } catch (error) {
        console.error("Payment error: ", error);
      }
    };
  
    // 6. UI
    return (
      <div className={styles.formcontainer}>
        {status === "failed" && (
          <div className="error-message">Something went wrong</div>
        )}
        {Object.values(errors).length > 0 && (
          <div className="error-message">
            Please fill out all required fields.
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className={`form-group ${styles.forms} ${styles.socialtoggle}`} style={{ gap: '15px' }}>
            {/* Рендерим поля */}
            {fields.map(({ name, placeholder }) => (
              <Input
                key={name}
                name={name}
                placeholder={placeholder}
                value={values[name]}
                onChange={handleChange}
                errors={errors[name] || ""}
              />
            ))}
  
            {/* Блок с Terms & Conditions */}
            <div>
              <p className={styles.agreement_text}>
                By proceeding with your purchase, you acknowledge that you have read, understood, and agree to the following:
              </p>
              <label className={labelClass}>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  className={styles.checkboxInput}
                  style={{ height: "20px", width: "20px" }}
                />
                I have read and agree to the{" "}
                <a
                  href="/terms-of-use"
                  style={{ color: "blue", textDecoration: "underline" }}
                  target="_blank"
                  rel="noreferrer"
                >
                  Terms of use
                </a> &{" "}
                <a
                  href="/privacy-policy"
                  style={{ color: "blue", textDecoration: "underline" }}
                  target="_blank"
                  rel="noreferrer"
                >
                  Privacy policy
                </a>
              </label>
            </div>
  
            {/* Кнопка Pay */}
            <Button
              variant={status === "loading" ? "grey" : "blue"}
              label={status === "loading" ? "Processing..." : "Pay"}
              iconType="arrowRight"
              type="submit"
            />
          </div>
        </form>
      </div>
    );
  };
  
  export default Payment;

// import Input from "../../components/Forms/Input";
// import styles from "./CheckOut.module.css";
// import Button from "../../components/Button";

// import {useDispatch, useSelector} from "react-redux";
// import {postPayment} from "../../store/slices/paymentSlice";

// import {useState} from "react";

// const fields = [
//     {name: "description", placeholder: "Description"},
//     {name: "first_line", placeholder: "First Line"},
//     {name: "city", placeholder: "City"},
//     {name: "postal_code", placeholder: "Postal Code"},
//     {name: "region", placeholder: "Region"},
//     {name: "country_code", placeholder: "Country Code"},
// ];

// const Payment = ({orderId}) => {
//     const dispatch = useDispatch();
//     const {status} = useSelector(state => state.payment);

//     const [values, setValues] = useState({
//         description: "",
//         first_line: "",
//         city: "",
//         postal_code: "",
//         region: "",
//         country_code: "",
//     });

//     // Ensure errors are initialized as an empty object
//     const [errors, setErrors] = useState({});
//     const [isChecked, setIsChecked] = useState(false);
//     const [labelClass, setLabelClass] = useState(styles.checkboxLabel);

//     const handleChange = (e) => {
//         const {name, value} = e.target;
//         setValues((prevValues) => ({
//             ...prevValues,
//             [name]: value,
//         }));
//         setErrors((prevErrors) => ({
//             ...prevErrors,
//             [name]: "", // Clear error for the field when user types
//         }));
//     };

//     const validateFields = () => {
//         const newErrors = {};
//         fields.forEach(({name, placeholder}) => {
//             if (!values[name]) {
//                 newErrors[name] = `${placeholder} is required`; // Set error for empty fields
//             }
//         });
//         return newErrors;
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         if (!isChecked) {
//             setLabelClass(styles.notActive); // Меняем класс, если чекбокс не отмечен
//             return;
//         }

//         const newErrors = validateFields();

//         if (Object.keys(newErrors).length > 0) {
//             // If there are validation errors, set them in the state and don't submit the form
//             setErrors(newErrors);
//             return;
//         }

//         const dataToSubmit = {
//             order_id: orderId,
//             address: {
//                 ...values,
//             },
//         };

//         dispatch(postPayment(dataToSubmit));
//         console.log(dataToSubmit);
//     };

//     const handleCheckboxChange = (e) => {
//         setIsChecked(e.target.checked);
//         if (e.target.checked) {
//             setLabelClass(styles.checkboxLabel); // Возвращаем стандартный класс при активации чекбокса
//         }
//     };


//     return (
//         <div className={styles.formcontainer}>
//             {status === "failed" && (
//                 <div className="error-message">Something went wrong</div>
//             )}
//             {Object.values(errors).length > 0 && (
//                 <div className="error-message">
//                     Please fill out all required fields.
//                 </div>
//             )}
//             <form onSubmit={handleSubmit}>
//                 <div className={`form-group ${styles.forms} ${styles.socialtoggle}`} style={{gap: '15px'}}>
//                     {fields.map(({name, placeholder}) => (
//                         <Input
//                             key={name}
//                             name={name}
//                             placeholder={placeholder}
//                             value={values[name]}
//                             onChange={handleChange}
//                             errors={errors[name] || ""}
//                         />
//                     ))}
//                     <div>
//                         {/* <p className={styles.agreement_text}>Terms and Conditions Agreement</p> */}
//                         <p className={styles.agreement_text}>By proceeding with your purchase, you acknowledge that you
//                             have read, understood, and agree to the following:</p>
//                         {/* <p className={styles.agreement_text}>Our Terms & Conditions, which govern your use of this
//                             website and your purchase.</p> */}
//                         <label className={labelClass}>
//                             <input
//                                 type="checkbox"
//                                 checked={isChecked}
//                                 // onChange={(e) => setIsChecked(e.target.checked)}
//                                 onChange={handleCheckboxChange}
//                                 className={styles.checkboxInput}
//                                 style={{height: '20px', width: '20px'}}
//                             />
//                             I have read and agree to the <a href="/terms-of-use"
//                                                             style={{color: 'blue', textDecoration: 'underline'}}
//                                                             target="_blank">Terms of use</a> & <a href="/privacy-policy"
//                                                                                                   style={{
//                                                                                                       color: 'blue',
//                                                                                                       textDecoration: 'underline'
//                                                                                                   }} target="_blank">Privacy
//                             policy</a>
//                         </label>
//                     </div>

//                     <Button
//                         variant={status === "loading" ? "grey" : "blue"}
//                         label={status === "loading" ? "Processing..." : "Pay"}
//                         iconType="arrowRight"
//                         type="submit"
//                         // disabled={!isChecked}
//                     />
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default Payment;
