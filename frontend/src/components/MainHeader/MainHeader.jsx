import { useState, useEffect } from "react";
import styles from "./MainHeader.module.css";
import Button from "../Button";
import Select from "../Forms/Select";
import { scrollArrowsvg } from "../../assets/svg/svgimages";
import useSmoothScroll from "../../hooks/useSmoothScroll";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { fetchCameras } from "../../store/slices/optionsSlice";
import { fetchFormats } from "../../store/slices/optionsSlice";
import { fetchLenses } from "../../store/slices/optionsSlice";

const MainHeader = () => {
  const dispatch = useDispatch();
  const { cameras, lenses, formats} = useSelector(state => state.options);

  const [formData, setFormData] = useState({
    camera: "",
    lens: "",
    format: "",
  });

  const scrollToSection = useSmoothScroll();
  const navigate = useNavigate();

  const handleSelectChange = (name, optionId) => {
    setFormData({ ...formData, [name]: optionId });
  };

  const handleSubmit = () => {
    const queryParams = new URLSearchParams({
      page: 1,
      page_size: 24,
      camera: formData.camera,
      lens: formData.lens,
      format: formData.format,
    }).toString();

    navigate(`/library?${queryParams}`);
  };

  const handleScroll = () => {
    scrollToSection("about-section");
  };

  const goToLibrary = () => {
    navigate("/library?page=1&page_size=24");
  };

  useEffect(() => {
    dispatch(fetchCameras());
    dispatch(fetchFormats());
    dispatch(fetchLenses());
  }, [dispatch]);


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
              options={cameras.map(camera => ({ id: camera.id, label: camera.model_name }))}
              selected={formData.camera}
              onSelect={optionId => handleSelectChange("camera", optionId)}
            />
            <Select
              name="lens"
              placeholder="Lens"
              options={lenses.map(lens => ({ id: lens.id, label: `${lens.brand} ${lens.model_name}` }))}
              selected={formData.lens}
              onSelect={optionId => handleSelectChange("lens", optionId)}
            />
            <Select
              name="format"
              placeholder="Format"
              options={formats.map(format => ({ id: format.id, label: format.format_type }))}
              selected={formData.format}
              onSelect={optionId => handleSelectChange("format", optionId)}
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
            onClick={goToLibrary}
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