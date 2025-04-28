import styles from "./LibraryItems.module.css";
import { redCross } from "../../assets/svg/svgimages";
import { useState, useEffect } from "react";
import Pagination from "../Pagination/Pagination";
import Asset from "../AssetsGrid/Asset";
import Button from "../Button";
import Filters from "../Filters/Filters";
import { useNavigate } from "react-router-dom";
import Toggle from "../Forms/Toggle";
import AdaptFilters from "../LibraryAdaptFilters/AdaptFilters";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

const LibraryItems = () => {
  const { products, status } = useSelector((state) => state.products);
  const { cameras, lenses } = useSelector((state) => state.options);
  const [searchParams, setSearchParams] = useSearchParams();

  const [selected, setSelected] = useState({ cameras: [], lenses: [] });
  const [openBrand, setOpenBrand] = useState(null);
  const [search, setSearch] = useState("");

  const urlCameras = searchParams.getAll("camera");
  const urlLenses = searchParams.getAll("lens");

  const navigate = useNavigate();

  useEffect(() => {
    console.log(products);
  }, [products]);

  useEffect(() => {
    if (cameras.length > 0 && lenses.length > 0) {
      const selectedCameras = cameras.filter((camera) =>
        urlCameras.includes(camera.id.toString())
      );
      const selectedLenses = lenses.filter((lens) =>
        urlLenses.includes(lens.id.toString())
      );
      setSelected({
        cameras: selectedCameras,
        lenses: selectedLenses,
      });
    }
  }, [cameras, lenses]);

  const toggleLensMenu = (brand) => {
    setOpenBrand(openBrand === brand ? null : brand);
  };

  const handleBrandSelect = (cameraObj, event) => {
    event.stopPropagation();
    setSelected((prev) => {
      const updatedCameras = prev.cameras.some((cam) => cam.id === cameraObj.id)
        ? prev.cameras.filter((b) => b.id !== cameraObj.id)
        : [...prev.cameras, cameraObj];
      return { ...prev, cameras: updatedCameras };
    });
  };

  const handleLensSelect = (lensObj) => {
    setSelected((prev) => {
      const updatedLenses = prev.lenses.some((lens) => lens.id === lensObj.id)
        ? prev.lenses.filter((l) => l.id !== lensObj.id)
        : [...prev.lenses, lensObj];
      return { ...prev, lenses: updatedLenses };
    });
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const resetAllFilters = () => {
    setSelected({ cameras: [], lenses: [] });
    setSearch("");
    navigate({ search: "" });
  };

  const applyFilters = () => {
    const updatedSearchParams = new URLSearchParams(searchParams);
    updatedSearchParams.delete("camera");
    updatedSearchParams.delete("lens");

    if (search) {
      updatedSearchParams.set("search", search);
    } else {
      updatedSearchParams.delete("search");
    }

    selected.cameras.forEach((camera) => {
      updatedSearchParams.append("camera", camera.id);
    });

    selected.lenses.forEach((lens) => {
      updatedSearchParams.append("lens", lens.id);
    });

    setSearchParams(updatedSearchParams);
  };

  const discardFilter = (itemId, type) => {
    const updatedSelected = {
      ...selected,
      [type]: selected[type].filter((item) => item.id !== itemId),
    };

    setSelected(updatedSelected);

    const updatedSearchParams = new URLSearchParams(searchParams);
    updatedSearchParams.delete(type === "cameras" ? "camera" : "lens");

    updatedSelected[type].forEach((remainingItem) => {
      updatedSearchParams.append(
        type === "cameras" ? "camera" : "lens",
        remainingItem.id
      );
    });

    setSearchParams(updatedSearchParams);
  };

  return (
    <>
      {/* Общий контейнер для всех состояний */}
      <div className={`${styles.globalContainer} ${
        status === "loading" ? styles.loadingState : ""
      }`}>
        {/* Основной контент */}
        <section
          style={{ paddingTop: "0px" }}
          className={`height ${styles.main} ${
            status !== "succeeded" ? styles.hiddenContent : ""
          }`}
        >
          <div className={styles.filterscont}>
            <AdaptFilters
              selected={selected}
              openBrand={openBrand}
              toggleLensMenu={toggleLensMenu}
              handleBrandSelect={handleBrandSelect}
              handleLensSelect={handleLensSelect}
              handleSearch={handleSearch}
              search={search}
              applyFilters={applyFilters}
            />
            <div className={styles.resetallfilters}>
              {(urlCameras.length > 0 || urlLenses.length > 0) && (
                <Button
                  variant="outline-red"
                  label="Reset all filters"
                  iconType="crossbtn"
                  onClick={resetAllFilters}
                />
              )}
            </div>
            {urlCameras?.map((cameraId, i) => {
              const camera = selected.cameras.find((cam) => cam.id === cameraId);
              return (
                camera && (
                  <button
                    onClick={() => discardFilter(cameraId, "cameras")}
                    key={i}
                    className={styles.deleteFilter}
                  >
                    {camera.model_name} {redCross}
                  </button>
                )
              );
            })}
            {urlLenses?.map((lensId, i) => {
              const lens = selected.lenses.find((lens) => lens.id === lensId);
              return (
                lens && (
                  <button
                    onClick={() => discardFilter(lensId, "lenses")}
                    key={i}
                    className={styles.deleteFilter}
                  >
                    {`${lens.brand} ${lens.model_name}`} {redCross}
                  </button>
                )
              );
            })}
          </div>

          <div className={styles.body}>
            <div className={styles.filterwrap}>
              <Filters
                selected={selected}
                openBrand={openBrand}
                toggleLensMenu={toggleLensMenu}
                handleBrandSelect={handleBrandSelect}
                handleLensSelect={handleLensSelect}
                handleSearch={handleSearch}
                search={search}
                applyFilters={applyFilters}
              />
            </div>

            {products?.results?.length > 0 ? (
              <div className={styles.assetscont}>
                <div className={styles.topPagination}>
                  <div className={styles.contpag}>
                    <Pagination
                      pagination={{
                        count: products.count,
                        next: products.next,
                        previous: products.previous,
                      }}
                    />
                  </div>
                  <div className={styles.toggleCont}>
                    <p>Free assets</p>
                    <Toggle />
                  </div>
                </div>
                <div className={styles.assets}>
                  {products.results.map((item) => (
                    <Asset key={item.id} asset={item} />
                  ))}
                </div>
                <Pagination
                  pagination={{
                    count: products.count,
                    next: products.next,
                    previous: products.previous,
                  }}
                />
              </div>
            ) : (
              <div className={styles.noitem}>
                <div className={styles.message}>
                  <h2 className="h3-medium">No Items Found</h2>
                  <p className="h4-medium">
                    It looks like there are no items that match your selected
                    filters. Please try adjusting your filters to see if other
                    options are available.
                  </p>
                </div>
                <div className={styles.toggleNoCont}>
                  <div className={styles.toggleNoCont_container}>
                    <p>Free assets</p>
                    <Toggle />
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Состояние загрузки */}
        {status === "loading" && (
          <div className={styles.loadingOverlay}>
            <LoadingScreen />
          </div>
        )}

        {/* Состояние ошибки */}
        {status === "failed" && (
          <div className={styles.errorOverlay}>
            <h2 className="h2-medium">Something went wrong</h2>
          </div>
        )}
      </div>
    </>
  );
};

export default LibraryItems;