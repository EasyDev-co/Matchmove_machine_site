
import styles from "./Filters.module.css";
import Button from "../Button";
import { minussvg, plussvg } from "../../assets/svg/svgimages";
import SearchInput from "../Forms/SearchInput";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCameras, fetchLenses } from "../../store/slices/optionsSlice";


const Filters = ({
  selected,
  toggleLensMenu,
  handleBrandSelect,
  handleLensSelect,
  handleSearch,
  search,
  openBrand,
  applyFilters
}) => {
  const dispatch = useDispatch();
  const { cameras, lenses } = useSelector(state => state.options);

  useEffect(() => {
    dispatch(fetchCameras());
    dispatch(fetchLenses());
  }, [dispatch]);

  return (
    <div className={styles.filterform}>
      <h3 className="h3-medium">Camera and Lens</h3>
      <div className={styles.input}>
        <SearchInput handleSearch={handleSearch} search={search} />
      </div>
      <div className={styles.filters}>
        {cameras.map(({ model_name, id }) => (
          <div key={id} className={styles.filter}>
            <div className={styles.brandContainer}>
              <div>
                <input
                  type="checkbox"
                  id={model_name}
                  checked={selected.cameras.some(cam => cam.id === id)} 
                  onChange={(e) => handleBrandSelect({ id, model_name }, e)}
                />
              </div>
              <button
                className={styles.plusButton}
                onClick={() => toggleLensMenu(model_name)}
              >
                <p>{model_name}</p>
                {openBrand === model_name ? minussvg : plussvg}
              </button>
            </div>
            <div className={`${styles.lensMenu} ${openBrand === model_name ? styles.show : ""}`}>
              {lenses.map(({ brand, model_name: lensModelName, id: lensId }) => {
                const item = `${brand} ${lensModelName}`;
                return  (
                  <div key={lensId} className={styles.lensItem}>
                    <label className={styles.checkboxLabel}>
                      <div>
                        <input
                          type="checkbox"
                          id={id+item}
                          checked={selected.lenses.some(lens => lens.id === lensId)} // Check if the object is in the selected lenses
                          onChange={() => handleLensSelect({ id: lensId, brand, model_name: lensModelName })} // Pass the object
                        />
                      </div>
                      {item}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.applyBtn}>
        <Button label="Apply" variant="blue" iconType="checkMark" onClick={applyFilters} />
      </div>
    </div>
  );
};

export default Filters;