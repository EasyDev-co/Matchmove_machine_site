import Input from "../../components/Forms/Input";
import styles from "./CheckOut.module.css";
import Button from "../../components/Button";

import { useDispatch, useSelector } from "react-redux";
import { postPayment } from "../../store/slices/paymentSlice";

import { useState } from "react";

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
  const { status } = useSelector(state => state.payment);

  const [values, setValues] = useState({
    description: "",
    first_line: "",
    city: "",
    postal_code: "",
    region: "",
    country_code: "",
  });

  // Ensure errors are initialized as an empty object
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Clear error for the field when user types
    }));
  };

  const validateFields = () => {
    const newErrors = {};
    fields.forEach(({ name, placeholder }) => {
      if (!values[name]) {
        newErrors[name] = `${placeholder} is required`; // Set error for empty fields
      }
    });
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validateFields();

    if (Object.keys(newErrors).length > 0) {
      // If there are validation errors, set them in the state and don't submit the form
      setErrors(newErrors);
      return;
    }

    const dataToSubmit = {
      order_id: orderId,
      address: {
        ...values,
      },
    };

    dispatch(postPayment(dataToSubmit));
    console.log(dataToSubmit);
  };

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
        <div className={`form-group ${styles.forms} ${styles.socialtoggle}`}>
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
