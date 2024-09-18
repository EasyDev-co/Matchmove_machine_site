import NavigationTop from "../components/NavigationTop/NavigationTop";
import DatabaseBanner from "../components/LibraryBanner/DatabaseBanner";
import LibraryItems from "../components/LibraryItems/LibraryItems";
import JoinCommunity from "../components/JoinCommunity/JoinCommunity";

import { useDispatch } from "react-redux";
import { fetchProducts } from "../store/slices/productSlice";
import { useEffect } from "react";

const Library = () => {

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(fetchProducts())
  },[dispatch])
  return (
    <>
      <NavigationTop title="Distortion Grids Database" text="Search for available distortion grids for chosen camera and lens models." />
      <DatabaseBanner/>
      <LibraryItems/>
      <JoinCommunity/>
    </>
  );
};

export default Library;
