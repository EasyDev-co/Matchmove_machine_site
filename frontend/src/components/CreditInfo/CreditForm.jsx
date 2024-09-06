import { useState } from "react";
import styles from "./CreditInfo.module.css";
import Button from "../Button";

const countries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  // Add more countries
];

const CreditCardForm = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [country, setCountry] = useState("");
  const [promocode, setPromocode] = useState("");
  const [errors, setErrors] = useState({});

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\s+/g, "").slice(0, 16);
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ");
    setCardNumber(formattedValue);
  };

  const handleExpiryDateChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4);
    const formattedValue = value.replace(/(\d{2})(?=\d)/g, "$1/").slice(0, 5);
    setExpiryDate(formattedValue);
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4);
    setCvv(value);
  };

  const handleCardholderNameChange = (e) => {
    setCardholderName(e.target.value);
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  const handlePromocodeChange = (e) => {
    const value = e.target.value.replace(/[^A-Z0-9]/g, "").slice(0, 16);
    const formattedValue = value.replace(/(.{4})/g, "$1-").slice(0, 19);
    setPromocode(formattedValue);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!/^\d{4} \d{4} \d{4} \d{4}$/.test(cardNumber)) {
      newErrors.cardNumber = "Invalid card number";
    }
    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
      newErrors.expiryDate = "Invalid expiry date";
    }
    if (!/^\d{3,4}$/.test(cvv)) {
      newErrors.cvv = "Invalid CVV";
    }
    if (!cardholderName) {
      newErrors.cardholderName = "Cardholder name is required";
    }
    if (!country) {
      newErrors.country = "Country is required";
    }
    if (!/^([A-Z0-9]{4}-){3}[A-Z0-9]{4}$/.test(promocode)) {
      newErrors.promocode = "Invalid promocode format";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted", {
        cardNumber,
        expiryDate,
        cvv,
        cardholderName,
        country,
        promocode,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formMain}>
        <div className={styles.field}>
          <label htmlFor="cardNumber">Card Number</label>
          <input
            type="text"
            id="cardNumber"
            value={cardNumber}
            onChange={handleCardNumberChange}
            placeholder="XXXX XXXX XXXX XXXX"
          />
          {errors.cardNumber && <span>{errors.cardNumber}</span>}
        </div>

        <div className={styles.field}>
          <label htmlFor="cardholderName">Cardholder Name</label>
          <input
            type="text"
            id="cardholderName"
            value={cardholderName}
            onChange={handleCardholderNameChange}
            placeholder="Greg"
          />
          {errors.cardholderName && <span>{errors.cardholderName}</span>}
        </div>

        <div className={styles.subfield}>
          <div className={styles.field}>
            <label htmlFor="expiryDate">Expiry Date</label>
            <input
              type="text"
              id="expiryDate"
              value={expiryDate}
              onChange={handleExpiryDateChange}
              placeholder="MM/YY"
            />
            {errors.expiryDate && <span>{errors.expiryDate}</span>}
          </div>

          <div className={styles.field}>
            <label htmlFor="cvv">CVV</label>
            <input
              type="text"
              id="cvv"
              value={cvv}
              onChange={handleCvvChange}
              placeholder="XXX"
            />
            {errors.cvv && <span>{errors.cvv}</span>}
          </div>
        </div>

        <div className={`${styles.subfield} ${styles.fieldPosition}`}>
          <div className={styles.field}>
            <label htmlFor="country">Country</label>
            <select id="country" value={country} onChange={handleCountryChange}>
              <option value="">Select Country</option>
              {countries.map((c, index) => (
                <option key={index} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {errors.country && <span>{errors.country}</span>}
          </div>

          <div className={styles.field}>
            <label htmlFor="promocode">Promocode</label>
            <div className={styles.promocodeCont}>
              <input
                type="text"
                id="promocode"
                value={promocode}
                onChange={handlePromocodeChange}
                placeholder="XXXX-XXXX-XXXX-XXXX"
              />
              <div className={styles.promobtn}><Button labelPosition="none" variant="grey" iconType="checkMark"/></div>
            </div>
            {errors.promocode && <span>{errors.promocode}</span>}
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreditCardForm;
