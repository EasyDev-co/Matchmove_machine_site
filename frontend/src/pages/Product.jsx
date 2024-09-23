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

  const { singleProduct } = useSelector(state => state.singleProduct)
  const dispatch = useDispatch()
  const { productId } = useParams();
  
  useEffect(()=>{
    dispatch(fetchSingleProduct(productId))
  },[dispatch, productId])

  if(singleProduct){
    return (
      // <>
      //   <NavigationTop title="Distortion grids pack for Canon EF" singleProduct={singleProduct}/>
      //   <ProductBanner singleProduct={singleProduct}/>
      //   <ProductDescription singleProduct={singleProduct}/>
      //   <ProductField singleProduct={singleProduct}/>
      //   <JoinCommunity/>
      //   <SharePage/>
      // </>
      <LoadingScreen/>
    );
  } 
}

export default Product