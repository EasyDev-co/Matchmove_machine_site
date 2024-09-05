import NavigationTop from "../components/NavigationTop/NavigationTop"
import ProductBanner from "../components/ProductBanner/ProductBanner";
import JoinCommunity from "../components/JoinCommunity/JoinCommunity";
import SharePage from "../components/SharePage/SharePage";
import ProductDescription from "../components/ProductDescription/ProductDescription";
import ProductField from "../components/ProductField/ProductField";

const Product = ()=>{
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