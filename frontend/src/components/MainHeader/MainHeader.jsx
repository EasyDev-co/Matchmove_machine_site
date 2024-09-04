import { useState } from "react";
import styles from "./MainHeader.module.css";
import Button from "../Button";
import Select from "../Forms/Select";
import { scrollArrowsvg } from "../../assets/svg/svgimages";
import useSmoothScroll from "../../hooks/useSmoothScroll";

const MainHeader = () => {
  const [formData, setFormData] = useState({
    camera: "",
    lensmanufacturer: "",
    lensmodel: "",
  });

  const scrollToSection = useSmoothScroll(); 

  const handleSelectChange = (name, option) => {
    setFormData({ ...formData, [name]: option });
    console.log(formData);
  };

  const handleSubmit = () => {
    console.log(formData);
  };

  const selectOptions = [
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4",
    "Option 5",
    "Option 6",
    "Option 7",
  ];

  const handleScroll = () => {
    scrollToSection("about-section");
  };

  return (
    <section className={styles.main}>
      <div className={styles.contentcont}>
        <h1 className={`h1-bold ${styles.title}`}>Distortion grids database</h1>
        <p className="h3-light">
          You can easily search ready-to-use distortion grids from our database.
          Just select the desired camera and lens, then click the 'Browse'
          button, or see the full library of available assets by clicking the
          link below.
        </p>

        <div className={styles.searchcont}>
          <form className={styles.form}>
            <Select
              name="camera"
              placeholder="Camera"
              options={selectOptions}
              selected={formData.camera}
              onSelect={(option) => handleSelectChange("camera", option)}
            />
            <Select
              name="lensmanufacturer"
              placeholder="Lens manufacturer"
              options={selectOptions}
              selected={formData.lensmanufacturer}
              onSelect={(option) =>
                handleSelectChange("lensmanufacturer", option)
              }
            />
            <Select
              name="lensmodel"
              placeholder="Lens model"
              options={selectOptions}
              selected={formData.lensmodel}
              onSelect={(option) => handleSelectChange("lensmodel", option)}
            />
            <div className={styles.formbtn}>
              <Button
                label="Browse"
                variant="blue"
                iconType="submit"
                onClick={handleSubmit}
              />
            </div>
          </form>
        </div>
        <div className={styles.btn}>
          <Button
            labelPosition="left"
            variant="outline-grey"
            label="See full library"
            iconType="arrowRight"
          />

          <button className={styles.scroll} onClick={handleScroll}>
            {scrollArrowsvg}
          </button>
        </div>
      </div>
      
    </section>
  );
};

export default MainHeader;
