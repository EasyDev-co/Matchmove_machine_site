import styles from "./LibraryItems.module.css"
import { redCross } from "../../assets/svg/svgimages";
import { useState } from "react";
import Pagination from "../Pagination/Pagination"
import Asset from "../AssetsGrid/Asset";
import Button from "../Button";
import Filters from "../Filters/Filters";
import { useNavigate } from "react-router-dom";

const assets = [
    { id: 1, price: 0, camera: "Canon", lense: "ME20F-SH", creator: "company" },
    { id: 2, price: 0, camera: "Craft", lense: "Camera 4K",  creator: "company"},
    { id: 3, price: 30, camera: "RED", lense: "EPIC-W 5K", creator: "user" },
    { id: 4, price: 0, camera: "Sony", lense: "Alpha a7S III",  creator: "company" },
    { id: 5, price: 0, camera: "Nikon", lense: "Z6 II",  creator: "company" },
    { id: 6, price: 10, camera: "Panasonic", lense: "Lumix GH5", creator: "user" },
    { id: 7, price: 0, camera: "Fujifilm", lense: "X-T4", creator: "user" },
    { id: 8, price: 0, camera: "Blackmagic", lense: "Pocket Cinema Camera 6K", creator: "company" },
    { id: 9, price: 0, camera: "GoPro", lense: "Hero 9 Black", creator: "company" },
    { id: 10, price: 0, camera: "Leica", lense: "SL2-S",  creator: "company" },
  ];

  const LibraryItems = () => {
    const [selected, setSelected] = useState({ cameras: [], lenses: [] });
    const [openBrand, setOpenBrand] = useState(null);

    const [showFilters, setShowFilters] = useState(false);
    const [isOn, setIsOn] = useState(false)

    const navigate = useNavigate()

    const toggleLensMenu = (brand) => {
        setOpenBrand(openBrand === brand ? null : brand);
    };

    const handleToggle =()=>{
      setIsOn(prev =>!prev)
    }

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
      <section className="height">
        <div className={styles.filterscont}>
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
          <Filters
            selected={selected}
            openBrand={openBrand}
            toggleLensMenu={toggleLensMenu}
            handleBrandSelect={handleBrandSelect}
            handleLensSelect={handleLensSelect}
            applyFilters={applyFilters}
          />

          <div className={styles.assetscont}>
            <div className={styles.topPagination}>
              <Pagination />
              <div className={styles.toggleCont}>
                <p>Free assets</p>
                <div
                  className={`${styles.toggleSwitch} ${isOn ? styles.on : ""}`}
                  onClick={handleToggle}
                >
                  <div className={styles.toggleButton}></div>
                </div>
              </div>
            </div>
            <div className={styles.assets}>
              {assets.map((item) => (
                <Asset key={item.id} asset={item} />
              ))}
            </div>
            <Pagination />
          </div>
        </div>
      </section>
    );
};

export default LibraryItems