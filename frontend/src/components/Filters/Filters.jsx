
import styles from "./Filters.module.css";
import Button from "../Button";
import { minussvg, plussvg } from "../../assets/svg/svgimages";
import SearchInput from "../Forms/SearchInput";

import { useEffect } from "react";
import { useDispatch, iseselector, useSelector } from "react-redux";
import { fetchCameras, fetchFormats, fetchLenses } from "../../store/slices/optionsSlice";

const cameraBrands = [
    { brand: 'ARRI ALEXA 65', lenses: [
        'ARRI Master Prime 14mm',
        'ARRI Master Prime 25mm',
        'ARRI Master Prime 35mm',
        'ARRI Ultra Prime 32mm',
        'ARRI Ultra Prime 50mm',
        'ARRI Ultra Prime 85mm',
        'ARRI Ultra Prime 135mm'
    ] },
    { brand: 'Canon', lenses: [
        'EF / 24-70mm f/2.8L II USM',
        'EF / 70-200mm f/2.8L IS III USM',
        'EF / 50mm f/1.8 STM',
        'EF / 16-35mm f/2.8L III USM',
        'EF / 100mm f/2.8L Macro IS USM',
        'EF / 85mm f/1.2L II USM',
        'EF / 35mm f/1.4L II USM'
    ] },
    { brand: 'Olympus', lenses: [
        'M.Zuiko Digital ED 12-40mm f/2.8 PRO',
        'M.Zuiko Digital ED 40-150mm f/2.8 PRO',
        'M.Zuiko Digital ED 25mm f/1.2 PRO',
        'M.Zuiko Digital ED 12mm f/2',
        'M.Zuiko Digital ED 45mm f/1.8',
        'M.Zuiko Digital ED 75mm f/1.8',
        'M.Zuiko Digital ED 60mm f/2.8 Macro'
    ] },
    { brand: 'Sony F65', lenses: [
        'Sony FE 24-70mm f/2.8 GM',
        'Sony FE 70-200mm f/2.8 GM OSS',
        'Sony FE 50mm f/1.2 GM',
        'Sony FE 16-35mm f/2.8 GM',
        'Sony FE 85mm f/1.4 GM',
        'Sony FE 90mm f/2.8 Macro G OSS',
        'Sony FE 35mm f/1.4 GM'
    ] },
    { brand: 'Panasonic AG-UX90', lenses: [
        'Lumix G Vario 12-32mm f/3.5-5.6 ASPH',
        'Lumix G Vario 35-100mm f/4-5.6 ASPH',
        'Lumix G X Vario 12-35mm f/2.8 II ASPH',
        'Lumix G X Vario 35-100mm f/2.8 II ASPH',
        'Lumix G 25mm f/1.7 ASPH',
        'Lumix G 42.5mm f/1.7 ASPH',
        'Lumix G 14mm f/2.5 ASPH'
    ] },
    {
        brand:"Panasonic AG-UX90", lenses: []
    },
    {
        brand:"Sony UMC-S3C", lenses: []
    },
];

const Filters = ({
  selected,
  toggleLensMenu,
  handleBrandSelect,
  handleLensSelect,
  openBrand,
  applyFilters
}) => {

  const dispatch = useDispatch()
  const {cameras, formats, lenses} = useSelector(state=> state.options)

  console.log(cameras);
  console.log(formats);
  console.log(lenses);
  
  useEffect(()=>{
    dispatch(fetchCameras())
    dispatch(fetchFormats())
    dispatch(fetchLenses())
  },[])

  return (
    <div className={styles.filterform}>
      <h3 className="h3-medium">Camera and Lens</h3>
      <div className={styles.input}>
        <SearchInput/>
      </div>
      <div className={styles.filters}>
        {cameraBrands.map(({ brand, lenses }, i) => (
          <div key={i} className={styles.filter}>
            <div className={styles.brandContainer}>
              <div>
                <input
                  type="checkbox"
                  checked={selected.cameras.includes(brand)}
                  onChange={(e) => handleBrandSelect(brand, e)}
                />
              </div>
              <button
                className={styles.plusButton}
                onClick={() => toggleLensMenu(brand)}
              >
                <p>{brand}</p>
                {openBrand === brand ? minussvg : plussvg}
              </button>
            </div>
            <div
              className={`${styles.lensMenu} ${
                openBrand === brand ? styles.show : ""
              }`}
            >
              {lenses.map((lens, i) => (
                <div key={i} className={styles.lensItem}>
                  <label className={styles.checkboxLabel}>
                    <div>
                      <input
                        type="checkbox"
                        checked={selected.lenses.includes(lens)}
                        onChange={() => handleLensSelect(lens)}
                      />
                    </div>
                    {lens}
                  </label>
                </div>
              ))}
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
