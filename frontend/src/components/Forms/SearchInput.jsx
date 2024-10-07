import { searchsvg } from "../../assets/svg/svgimages"

const SearchInput = ({handleSearch, search})=>{
    return (
      <>
        <input type="text" placeholder="Serch" id="search" value={search} onChange={handleSearch} />
        {searchsvg}
      </>
    );
}

export default SearchInput