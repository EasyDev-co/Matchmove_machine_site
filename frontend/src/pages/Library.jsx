import NavigationTop from "../components/NavigationTop/NavigationTop";
import DatabaseBanner from "../components/LibraryBanner/DatabaseBanner";
import LibraryItems from "../components/LibraryItems/LibraryItems";
import JoinCommunity from "../components/JoinCommunity/JoinCommunity";

import { useDispatch } from "react-redux";
import { fetchProducts } from "../store/slices/productSlice";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const Library = () => {

  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!searchParams.get("page")) {
      setSearchParams({ page: 1, page_size: 2 });
    }
  }, [searchParams, setSearchParams]);

  const page = Number(searchParams.get('page')) || 1;
  const pageSize = Number(searchParams.get('page_size')) || 2;
  const accessType = searchParams.get('access_type') || "";
  const search = searchParams.get('search') || "";

  useEffect(() => {
    dispatch(fetchProducts({ page, pageSize, accessType, search }));
  }, [page, pageSize, accessType, search, dispatch]);


  
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
