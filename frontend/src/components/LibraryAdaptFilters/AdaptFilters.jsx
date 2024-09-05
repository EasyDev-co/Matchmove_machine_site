import styles from "./AdaptFilters.module.css"
import { useState, useEffect } from "react";
import Toggle from "../Forms/Toggle"
import Filters from "../Filters/Filters"
import { filterssvg } from "../../assets/svg/svgimages";

const AdaptFilters = ({
  selected,
  toggleLensMenu,
  handleBrandSelect,
  handleLensSelect,
  openBrand,
  applyFilters,
}) => {

    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [filtersOpen, setFiltersOpen] = useState(false);

    const toggleFilters = () => {
        setFiltersOpen(!filtersOpen);
      };

    useEffect(() => {
      const handleResize = () => {
        setIsSmallScreen(window.innerWidth <= 1200);
      };
      handleResize();
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
    
  return (
    <div className={styles.main}>
      <button className={styles.btn} onClick={toggleFilters}>
        <p>Filter</p> {filterssvg}
      </button>
      <div className={styles.filtersmenu}>
        {(isSmallScreen && filtersOpen) && (
          <Filters
            selected={selected}
            openBrand={openBrand}
            toggleLensMenu={toggleLensMenu}
            handleBrandSelect={handleBrandSelect}
            handleLensSelect={handleLensSelect}
            applyFilters={applyFilters}
            toggleFilters={toggleFilters}
          />
        )}
      </div>
      <div className={styles.togglewrap}>
      <p>Free assets</p>
        <Toggle />
      </div>
    </div>
  );
};

export default AdaptFilters