import styles from "./ContributionForm.module.css";
import { useState } from "react";
import Button from "../Button";
import { selectFilesvg } from "../../assets/svg/svgimages";

const ContributionForm = () => {
  const [formValues, setFormValues] = useState({
    camera: "",
    lensManufacturer: "",
    lensModel: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form Submitted:", formValues);

    setFormValues({
      camera: "",
      lensManufacturer: "",
      lensModel: "",
      description: "",
    });
  };
  return (
    <form>
    <div className={styles.formCont}>
      
        <div className={styles.form}>
          <input
            type="text"
            id="camera"
            name="camera"
            value={formValues.camera}
            onChange={handleChange}
            placeholder="Camera"
            required
          />
          <select
            id="lensManufacturer"
            name="lensManufacturer"
            value={formValues.lensManufacturer}
            onChange={handleChange}
            required
          >
            <option value="">Select Manufacturer</option>
            <option value="Canon">Canon</option>
            <option value="Nikon">Nikon</option>
            <option value="Sony">Sony</option>
            <option value="Fujifilm">Fujifilm</option>
          </select>

          <input
            type="text"
            id="lensModel"
            name="lensModel"
            placeholder="Lens Model"
            value={formValues.lensModel}
            onChange={handleChange}
            required
          />

          <textarea
            id="description"
            name="description"
            placeholder="Description"
            value={formValues.description}
            onChange={handleChange}
            rows="4"
            required
          />

          <Button
            variant="blue"
            label="Send"
            iconType="arrowRight"
            onClick={handleSubmit}
          />
        </div>
      

      <div className={styles.atachment}>
        <div className={styles.attachCont}>
          {selectFilesvg}
          <p className={styles.selectmessage}>Select a file from local drive or <span>drag it here</span></p>
          <p className={styles.caution}>(The download file cannot be larger than 15 MB)</p>
        </div>
        <div className={styles.btn}><Button variant="grey" label="Import" iconType="arrowRight"/></div>
      </div>
      
    </div>
    </form>
  );
};

export default ContributionForm;
