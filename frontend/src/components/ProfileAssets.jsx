import { useState, useEffect} from "react"
import AssetsGrid from "./AssetsGrid/AssetsGrid";

import { fetchUserProducts } from "../store/slices/profileProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const ProfileAssets =()=>{

    const dispatch = useDispatch()
    const {userProducts} = useSelector(state=> state.profileProduct)
    const [searchParams, setSearchParams] = useSearchParams();

    const [activeCategory, setActiveCategory] = useState('assets');
    useEffect(() => {
        console.log(userProducts)
      }, [userProducts]);    

      // Check and set default values for page and page_size
  useEffect(() => {
    if (!searchParams.get("page")) {
      setSearchParams({ page: 1, page_size: 2 });
    }
  }, [searchParams, setSearchParams]);

    const page = Number(searchParams.get('page')) || 1;
    const pageSize = Number(searchParams.get('page_size')) || 2;

    const handleCategoryChange = (category) => {
        setActiveCategory(category);
    };

    useEffect(() => {
        dispatch(fetchUserProducts({ page, pageSize }));
      }, [page, pageSize, dispatch]);

    if(userProducts.results && userProducts.results.length>0){
        return (
            <section className="width">
                <div className="assets-toggle">
                    <button
                        className={`asset-category ${activeCategory === 'assets' ? 'active' : ''}`}
                        onClick={() => handleCategoryChange('assets')}
                    >
                        Assets
                    </button>
                    <button
                        className={`asset-category ${activeCategory === 'purchases' ? 'active' : ''}`}
                        onClick={() => handleCategoryChange('purchases')}
                    >
                        My purchases
                    </button>
                </div>
                <AssetsGrid items={userProducts.results} pagination={{count:userProducts.count, next:userProducts.next, previous:userProducts.previous}}/>
            </section>
        );
    }

    if(userProducts.results && userProducts.results.length<=0){
        return <section className="width">  <h2 className="h2-medium">Author has no assets yet</h2></section>
    }
};
export default ProfileAssets