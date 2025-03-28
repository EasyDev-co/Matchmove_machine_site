import NavigationTop from "../components/NavigationTop/NavigationTop"
import ProductBanner from "../components/ProductBanner/ProductBanner";
import JoinCommunity from "../components/JoinCommunity/JoinCommunity";
import SharePage from "../components/SharePage/SharePage";
import ProductDescription from "../components/ProductDescription/ProductDescription";
import ProductField from "../components/ProductField/ProductField";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";

import { useState } from "react";

import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct } from "../store/slices/singleProductSlice";
import Modal from "../components/Modal/Modal";
import ContacUs from "../components/ContacUs/ContacUs";

const Product = ()=>{

  const { singleProduct, status} = useSelector(state => state.singleProduct)
  const dispatch = useDispatch()
  const { productId } = useParams();
  const [isOpen, setIsOpen] = useState(false);

  const [activeButton, setActiveButton] = useState('Assets');
  
  useEffect(()=>{
    dispatch(fetchSingleProduct(productId))
  },[dispatch, productId])

  const handleButtonClick = (buttonName) => {
      setActiveButton(buttonName);
  };
  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };


  if(status.fetchProductStatus==="loading"){
    return(
      <LoadingScreen/>
    )
  }

  if(singleProduct &&status.fetchProductStatus==="succeeded"){
    return (
      <>
        <NavigationTop title={`Distortion grids pack for ${singleProduct.camera.model_name} ${singleProduct.lens.model_name}`} singleProduct={singleProduct}/>
        {/* <ProductBanner singleProduct={singleProduct}/> */}
        <ProductDescription handleOpen={handleOpen} singleProduct={singleProduct} handleButtonClick={handleButtonClick}/>
        <ProductField singleProduct={singleProduct} handleButtonClick={handleButtonClick} activeButton={activeButton}/>
        <JoinCommunity/>
        <SharePage profile={singleProduct.author} />
        <Modal isOpen={isOpen} onClose={handleClose}>
        <ContacUs />
      </Modal>
      </>
    );
  } 

  if(status.fetchProductStatus==="failed"){
    return <section className="width"><h2 className="h2-medium">Item not found or an error occurred.</h2> <p className="h4-medium">Please try again.</p></section>
  }
}

export default Product