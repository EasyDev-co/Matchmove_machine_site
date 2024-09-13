import { searchsvg } from "../../assets/svg/svgimages"

const SearchInput = ()=>{
    return (
      <>
        <input type="text" placeholder="Serch" id="search" />
        {searchsvg}
      </>
    );
}

export default SearchInput