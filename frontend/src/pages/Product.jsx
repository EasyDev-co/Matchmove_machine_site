import NavigationTop from "../components/NavigationTop/NavigationTop"
import ProductBanner from "../components/ProductBanner/ProductBanner";
import JoinCommunity from "../components/JoinCommunity/JoinCommunity";
import SharePage from "../components/SharePage/SharePage";
import ProductDescription from "../components/ProductDescription/ProductDescription";
import ProductField from "../components/ProductField/ProductField";

import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchSingleProduct } from "../store/slices/singleProductSlice";

const Product = ()=>{

  const dispatch = useDispatch()
  const { productId } = useParams();

  useEffect(()=>{
    dispatch(fetchSingleProduct(productId))
  },[dispatch, productId])
    return (
      <>
        <NavigationTop title="Distortion grids pack for Canon EF"/>
        <ProductBanner/>
        <ProductDescription/>
        <ProductField/>
        <JoinCommunity/>
        <SharePage/>
      </>
    );
}

export default Product