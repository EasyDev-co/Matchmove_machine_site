import NavigationTop from "../components/NavigationTop/NavigationTop"
import ProductBanner from "../components/ProductBanner/ProductBanner";
import JoinCommunity from "../components/JoinCommunity/JoinCommunity";
import SharePage from "../components/SharePage/SharePage";
import ProductDescription from "../components/ProductDescription/ProductDescription";
import ProductField from "../components/ProductField/ProductField";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";

import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct } from "../store/slices/singleProductSlice";

const Product = ()=>{

  const { singleProduct, status} = useSelector(state => state.singleProduct)
  const dispatch = useDispatch()
  const { productId } = useParams();

  console.log(singleProduct);
  
  
  useEffect(()=>{
    dispatch(fetchSingleProduct(productId))
  },[dispatch, productId])

  if(status.fetchProductStatus==="loading"){
    return(
      <LoadingScreen/>
    )
  }

  if(singleProduct){
    return (
      <>
        <NavigationTop title={`Distortion grids pack for ${singleProduct.camera.model_name} ${singleProduct.lens.model_name}`} singleProduct={singleProduct}/>
        <ProductBanner singleProduct={singleProduct}/>
        <ProductDescription singleProduct={singleProduct}/>
        <ProductField singleProduct={singleProduct}/>
        <JoinCommunity/>
        <SharePage/>
      </>
    );
  } 

  if(status.fetchProductStatus==="failed"){
    return <section className="width"><h2 className="h2-medium">Item not found or an error occurred.</h2> <p className="h4-medium">Please try again.</p></section>
  }
}

export default Product