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
      setSearchParams({ page: 1, page_size: 24 });
    }
  }, [searchParams, setSearchParams]);

  const page = Number(searchParams.get('page')) || 1;
  const pageSize = Number(searchParams.get('page_size')) || 24;
  const accessType = searchParams.get('access_type') || "";
  const search = searchParams.get('search') || "";
  const format = searchParams.get('format') || ""

  const cameras = searchParams.getAll('camera') || [];
  const lenses = searchParams.getAll('lens') || [];

  useEffect(() => {
    dispatch(fetchProducts({ 
      page, 
      pageSize, 
      accessType, 
      search, 
      camera: cameras,
      lens: lenses,
      format,
    }));
  }, [page, pageSize, accessType, search, cameras, lenses, format, dispatch]);
  
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
