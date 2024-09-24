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
import { useSearchParams } from "react-router-dom";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

const LibraryItems = () => {
  const { products, status } = useSelector((state) => state.products);
  const [searchParams, setSearchParams] = useSearchParams();

  const [selected, setSelected] = useState({ cameras: [], lenses: [] });
  const [openBrand, setOpenBrand] = useState(null);
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const urlCameras = searchParams.getAll("camera");
  const urlLenses = searchParams.getAll("lens");

  const navigate = useNavigate();

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
    setShowFilters(false);
    setSearch("");
    navigate({ search: "" }); // Clear URL filters
  };

  const applyFilters = () => {
    setShowFilters(true);

    const updatedSearchParams = new URLSearchParams(searchParams);
    updatedSearchParams.delete("camera");
    updatedSearchParams.delete("lens");

    // Update the search parameter if there's a search value
    if (search) {
      updatedSearchParams.set("search", search);
    } else {
      updatedSearchParams.delete("search");
    }

    // Append the IDs of selected cameras
    selected.cameras.forEach((camera) => {
      updatedSearchParams.append("camera", camera.id);
    });

    // Append the IDs of selected lenses
    selected.lenses.forEach((lens) => {
      updatedSearchParams.append("lens", lens.id);
    });

    // Update the URL with the new search parameters
    setSearchParams(updatedSearchParams);
  };

  const discardFilter = (itemId, type) => {
    const updatedSelected = {
      ...selected,
      [type]: selected[type].filter((item) => item.id !== itemId), // Compare IDs for filtering
    };

    setSelected(updatedSelected);

    const updatedSearchParams = new URLSearchParams(searchParams);
    updatedSearchParams.delete(type === "cameras" ? "camera" : "lens");

    updatedSelected[type].forEach((remainingItem) => {
      updatedSearchParams.append(
        type === "cameras" ? "camera" : "lens",
        remainingItem.id
      ); // Append the ID
    });

    setSearchParams(updatedSearchParams);
  };

  if(status==="loading"){
    return <LoadingScreen/>
  }

  if(status==="succeeded"){
    return (
      <section className={`height ${styles.main}`}>
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
            {(urlCameras.length > 0 || urlLenses.length > 0 || search) && (
              <Button
                variant="outline-red"
                label="Reset all filters"
                iconType="crossbtn"
                onClick={resetAllFilters}
              />
            )}
          </div>
          {urlCameras &&
            urlCameras.map((cameraId, i) => {
              const camera = selected.cameras.find(
                (cam) => cam.id === cameraId
              );
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
          {urlLenses &&
            urlLenses.map((lensId, i) => {
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

          {products.results.length > 0 ? (
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
            <div className={styles.message}>
              <h2 className="h3-medium">No Items Found</h2>{" "}
              <p className="h4-medium">
                It looks like there are no items that match your selected
                filters. Please try adjusting your filters to see if other
                options are available.
              </p>
            </div>
          )}
        </div>
      </section>
    );
  }

  
  if(status==="failed"){
    return(
      <section className="width">
        <h2 className="h2-medium">Something went wrong</h2>
      </section>
    )
  }

  
};

export default LibraryItems;
