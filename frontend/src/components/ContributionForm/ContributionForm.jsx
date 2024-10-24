import styles from "./ContributionForm.module.css";
import { useState, useRef } from "react";
import Button from "../Button";
import { selectFilesvg } from "../../assets/svg/svgimages";
import ThankYouMessage from "./ThankYouMessage";

import { useDispatch, useSelector } from "react-redux";
import { uploadProductFile } from "../../store/slices/singleProductSlice";

const ContributionForm = () => {

  const dispatch = useDispatch()
  const {status} = useSelector(state=> state.singleProduct)

  const [formValues, setFormValues] = useState({
    camera: "",
    lensManufacturer: "",
    lensModel: "",
    description: "",
  });
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Reference for the file input
  const fileInputRef = useRef(null);

  // Handling input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Handling file change (from input or drag-drop)
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  // Triggering the file input when the Import button is clicked
  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure a file is selected
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    dispatch(uploadProductFile({ formData: formValues, file }))
      .unwrap()
      .then(() => {
        // On success, show ThankYouMessage
        setSubmitted(true);
      })
      .catch((error) => {
        console.error("File upload failed: ", error);
      });


    // Reset the form and file input after submission
    setFormValues({
      camera: "",
      lensManufacturer: "",
      lensModel: "",
      description: "",
    });
    setFile(null);
  };

  // Drag and Drop Handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  if (submitted) {
    return <ThankYouMessage/>
  }

  return (
    <form onSubmit={handleSubmit}>
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
            variant={status.uploadProductStatus==="loading"?"grey":"blue"}
            label={status.uploadProductStatus==="loading"?"Sending...":"Send"}
            iconType="arrowRight"
            onClick={handleSubmit}
          />
        </div>

        <div
          className={styles.atachment}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <div className={styles.attachCont}>
            {selectFilesvg}
            <p className={styles.selectmessage}>
              Select a file from local drive or <span>drag it here</span>
            </p>
            <p className={styles.caution}>
              (The download file cannot be larger than 15 MB)
            </p>
          </div>
          <div className={styles.btn}>
            <input
              type="file"
              id="fileInput"
              accept=".jpg,.jpeg,.png,.pdf" // Adjust file types accordingly
              ref={fileInputRef}
              style={{ display: "none" }} // Hiding the file input using CSS
              onChange={handleFileChange}
            />
            <Button
              variant="grey"
              label="Import"
              iconType="arrowRight"
              onClick={handleFileClick}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default ContributionForm;