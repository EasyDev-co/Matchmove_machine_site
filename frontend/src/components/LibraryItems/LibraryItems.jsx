import styles from "./LibraryItems.module.css"
import { redCross } from "../../assets/svg/svgimages";
import { useState } from "react";
import Pagination from "../Pagination/Pagination"
import Asset from "../AssetsGrid/Asset";
import Button from "../Button";
import Filters from "../Filters/Filters";
import { useNavigate } from "react-router-dom";
import Toggle from "../Forms/Toggle";
import AdaptFilters from "../LibraryAdaptFilters/AdaptFilters";
import { useSelector } from "react-redux";

  const LibraryItems = () => {

    const {products} = useSelector(state => state.products)

    console.log(products);
    

    const [selected, setSelected] = useState({ cameras: [], lenses: [] });
    const [openBrand, setOpenBrand] = useState(null);

    const [showFilters, setShowFilters] = useState(false);

    const navigate = useNavigate()

    const toggleLensMenu = (brand) => {
        setOpenBrand(openBrand === brand ? null : brand);
    };

    const handleBrandSelect = (brand, event) => {
        event.stopPropagation();
        setSelected(prev => {
            const updatedCameras = prev.cameras.includes(brand)
                ? prev.cameras.filter(b => b !== brand)
                : [...prev.cameras, brand];
            return { ...prev, cameras: updatedCameras };
        });
    };

    const handleLensSelect = (lens) => {
        setSelected(prev => {
            const updatedLenses = prev.lenses.includes(lens)
                ? prev.lenses.filter(l => l !== lens)
                : [...prev.lenses, lens];
            return { ...prev, lenses: updatedLenses };
        });
        
    };

    const resetAllFilters = () => {
        setSelected({ cameras: [], lenses: [] });
        setShowFilters(false);
        navigate({ search: '' }); // Clear URL filters
    };

    const applyFilters = () => {
        const query = new URLSearchParams();
        selected.cameras.forEach(camera => query.append('camera', camera));
        selected.lenses.forEach(lens => query.append('lens', lens));
        navigate({ search: query.toString() }); // Update URL with filters
        setShowFilters(true)
    };

    const discardFilter = (item, type) => {
        setSelected(prev => {
            const updated = { ...prev };
            updated[type] = updated[type].filter(i => i !== item);
            return updated;
        });

        const query = new URLSearchParams();
        selected.cameras.filter(c => c !== item).forEach(camera => query.append('camera', camera));
        selected.lenses.filter(l => l !== item).forEach(lens => query.append('lens', lens));
        navigate({ search: query.toString() }); // Update URL with filters
    };

    return (
      <section className={`height ${styles.main}`}>
        <div className={styles.filterscont}>
          <AdaptFilters
            selected={selected}
            openBrand={openBrand}
            toggleLensMenu={toggleLensMenu}
            handleBrandSelect={handleBrandSelect}
            handleLensSelect={handleLensSelect}
            applyFilters={applyFilters}
          />
          <div className={styles.resetallfilters}>
            {showFilters && (
              <Button
                variant="outline-red"
                label="Reset all filters"
                iconType="crossbtn"
                onClick={resetAllFilters}
              />
            )}
          </div>
          {showFilters &&
            selected.cameras &&
            selected.cameras.map((item, i) => (
              <button
                onClick={() => discardFilter(item, "cameras")}
                key={i}
                className={styles.deleteFilter}
              >
                {item} {redCross}
              </button>
            ))}
          {showFilters &&
            selected.lenses &&
            selected.lenses.map((item, i) => (
              <button
                onClick={() => discardFilter(item, "lenses")}
                key={i}
                className={styles.deleteFilter}
              >
                {item} {redCross}
              </button>
            ))}
        </div>

        <div className={styles.body}>
          <div className={styles.filterwrap}>
            <Filters
              selected={selected}
              openBrand={openBrand}
              toggleLensMenu={toggleLensMenu}
              handleBrandSelect={handleBrandSelect}
              handleLensSelect={handleLensSelect}
              applyFilters={applyFilters}
            />
          </div>

          <div className={styles.assetscont}>
            <div className={styles.topPagination}>
              <div className={styles.contpag}>
                <Pagination />
              </div>
              <div className={styles.toggleCont}>
                <p>Free assets</p>
                <Toggle />
              </div>
            </div>
            <div className={styles.assets}>
              {products.results? products.results.map((item) => (
                <Asset key={item.id} asset={item} />
              )):""}
            </div>
            <Pagination />
          </div>
        </div>
      </section>
    );
};

export default LibraryItems