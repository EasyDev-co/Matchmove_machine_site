import styles from "./ProductDescription.module.css";
import { useState } from "react";
import Button from "../Button";
import { Link, useNavigate } from "react-router-dom";
import { companysvg } from "../../assets/svg/svgimages";
import pfp from "../../assets/images/iconplaceholder.png";

import { useDispatch, useSelector } from "react-redux";
import { postCartItem } from "../../store/slices/cartSlice";
import { downloadProductFile } from "../../store/slices/singleProductSlice";

import useSmoothScroll from "../../hooks/useSmoothScroll";
import Modal from "../Modal/Modal";
import ContacUs from "../ContacUs/ContacUs";

const ProductDescription = ({ singleProduct, handleButtonClick, setIsOpen, handleOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  const { postCartItemStatus } = useSelector((state) => state.cart);
  // const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = useSmoothScroll();

  const addToCart = () => {
    if (isAuthenticated) {
      dispatch(postCartItem(singleProduct.id));
    } else {
      navigate("/authorization");
    }
  };

  const downloadAsset = () => {
    if (isAuthenticated) {
      dispatch(downloadProductFile(singleProduct.id));
    } else {
      navigate("/authorization");
    }
  };

  const handleSeeAllOptionsClick = () => {
    scrollToSection("assets");
    handleButtonClick("Assets");
  };

  return (
    <section className="height" id="description">
      <div className={styles.main}>
        <div className={styles.infoCont}>
          <h2 className="h2-medium">Price</h2>
          <div className={styles.pricecont}>
            <div className={styles.priceBtn}>
              {singleProduct.access_type == "free" ? (
                <Button variant="grey" label="Free" />
              ) : (
                <Button
                  variant={postCartItemStatus === "loading" ? "grey" : "blue"}
                  label={`${
                    postCartItemStatus === "loading"
                      ? "Adding..."
                      : singleProduct.price + "$"
                  }`}
                  iconType="cart"
                  onClick={addToCart}
                />
              )}
            </div>
            <div className={styles.priceBtn}>
              <Button
                label="FREE ASSET"
                iconType="download"
                variant="outline-blue"
                onClick={downloadAsset}
              />
            </div>
            <p>
              File size: <span className={styles.assetSize}>126 MB</span>
            </p>
            <button
              className={styles.button}
              onClick={handleSeeAllOptionsClick}
            >
              See all options
            </button>
          </div>
        </div>

        <div className={styles.container}>
          <h2 className="h2-medium">Author</h2>
          {singleProduct.author.username ? (
            <Link
              className={styles.authorInfo}
              to={`/profile/${singleProduct.author.id}`}
            >
              <img
                src={
                  singleProduct.author.profile_picture
                    ? singleProduct.author.profile_picture
                    : pfp
                }
                alt="icon"
              />
              {singleProduct.author.username}
            </Link>
          ) : (
            <a href="/" className={styles.authorInfo}>
              {companysvg} Matchmove machine
            </a>
          )}
        </div>

        <div className={`${styles.container} ${styles.license}`}>
          <h2 className="h2-medium">License</h2>
          <p className={styles.assetSize}>
            Need a license for the studio? We're happy to offer a tailored
            pricing plan. Get in touch with our manager to acquire the necessary
            asset for your studio.
          </p>
          <button className={styles.button} onClick={handleOpen}>
            Contact us
          </button>
        </div>
        {/* <Modal isOpen={isOpen} onClose={handleClose}>
        <ContacUs />
      </Modal> */}
      </div>
      {/* <Modal isOpen={isOpen} onClose={handleClose}>
        <ContacUs />
      </Modal> */}
    </section>
  );
};

export default ProductDescription;
