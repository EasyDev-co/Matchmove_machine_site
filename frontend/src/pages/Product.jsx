import NavigationTop from "../components/NavigationTop/NavigationTop"
import ProductBanner from "../components/ProductBanner/ProductBanner";
import JoinCommunity from "../components/JoinCommunity/JoinCommunity";
import SharePage from "../components/SharePage/SharePage";

const Product = ()=>{
    return (
      <>
        <NavigationTop />
        <ProductBanner/>
        <JoinCommunity/>
        <SharePage/>
      </>
    );
}

export default Product