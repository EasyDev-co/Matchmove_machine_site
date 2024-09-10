import NavigationTop from "../components/NavigationTop/NavigationTop";
import DatabaseBanner from "../components/LibraryBanner/DatabaseBanner";
import LibraryItems from "../components/LibraryItems/LibraryItems";
import JoinCommunity from "../components/JoinCommunity/JoinCommunity";

const Library = () => {
  return (
    <>
      <NavigationTop />
      <DatabaseBanner/>
      <LibraryItems/>
      <JoinCommunity/>
    </>
  );
};

export default Library;
