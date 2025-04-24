import styles from "./Assets.module.css";
import Button from "../Button";
import { companysvg } from "../../assets/svg/svgimages";
import pfp from "../../assets/images/iconplaceholder.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postCartItem } from "../../store/slices/cartSlice";

const Asset = ({ asset }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);

  const cartIcon = (
    <svg
      width="30"
      height="34"
      viewBox="0 0 30 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.3999 30.3332C8.66657 30.3332 8.03901 30.0723 7.51724 29.5505C6.99546 29.0287 6.73412 28.4007 6.73324 27.6665C6.73324 26.9332 6.99457 26.3056 7.51724 25.7838C8.0399 25.2621 8.66746 25.0007 9.3999 24.9998C10.1332 24.9998 10.7612 25.2612 11.2839 25.7838C11.8066 26.3065 12.0675 26.9341 12.0666 27.6665C12.0666 28.3998 11.8057 29.0278 11.2839 29.5505C10.7621 30.0732 10.1341 30.3341 9.3999 30.3332ZM22.7332 30.3332C21.9999 30.3332 21.3723 30.0723 20.8506 29.5505C20.3288 29.0287 20.0675 28.4007 20.0666 27.6665C20.0666 26.9332 20.3279 26.3056 20.8506 25.7838C21.3732 25.2621 22.0008 25.0007 22.7332 24.9998C23.4666 24.9998 24.0946 25.2612 24.6172 25.7838C25.1399 26.3065 25.4008 26.9341 25.3999 27.6665C25.3999 28.3998 25.139 29.0278 24.6172 29.5505C24.0955 30.0732 23.4675 30.3341 22.7332 30.3332ZM8.26657 8.99984L11.4666 15.6665H20.7999L24.4666 8.99984H8.26657ZM6.9999 6.33317H28.9999L22.3666 18.3332H10.8666L9.3999 20.9998H25.3999V23.6665H4.8999L8.86657 16.4665L4.06657 6.33317H1.3999V3.6665H5.73324L6.9999 6.33317Z"
        fill="currentColor" // Set to currentColor to inherit the color from parent
      />
    </svg>
  );

  const handleNavigation = () => {
    if (isAuthenticated) {
      navigate(`/library/product/${asset.id}`);
    } else {
      navigate("/authorization");
    }
  };

  const addToCart =()=>{
  
      if(isAuthenticated){
      dispatch(postCartItem(asset.id))
    } else {
      navigate("/authorization")
    }
    }

  const user = (
    <div className={styles.user}>
      <p>{asset.author.username}</p>{" "}
      <img
        src={asset.author.profile_picture ? asset.author.profile_picture : pfp}
        alt="icon"
      />
    </div>
  );

  return (
    <article className={styles.asset} onClick={handleNavigation}>
      <div className={styles.assetthumbnail}>
        <div className={styles.creator}>
          {asset.creator === "company" ? companysvg : user}
        </div>
        <p className={styles.title}>
          {asset.camera.model_name} {asset.lens.brand} {asset.lens.model_name}
        </p>
        <button
          // type={props.type || "button"}
          className={`custom-button button-${!asset.price ? "grey" : "blue"}`}
        >
          {!asset.price ? "FREE" : `${asset.price}$`}
          <div
            style={{ cursor: "pointer", position: "relative", zIndex: "8" }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log("clicked");
              addToCart();
            }}
          >
            {cartIcon}
          </div>
        </button>
        {/* <Button label={!asset.price? "FREE": `${asset.price}$`} variant={!asset.price? "grey": "blue"}/> */}
      </div>
    </article>
  );
};

export default Asset;
