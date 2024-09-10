import { searchsvg } from "../../assets/svg/svgimages"

const SearchInput = ()=>{
    return (
      <>
        <input type="text" placeholder="Serch" />
        {searchsvg}
      </>
    );
}

export default SearchInput