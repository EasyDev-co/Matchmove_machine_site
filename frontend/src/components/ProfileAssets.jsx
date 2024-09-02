import { useState, useEffect } from "react"
import AssetsGrid from "./AssetsGrid/AssetsGrid";

const assets = [
  { id: 1, price: 0, camera: "Canon", lense: "ME20F-SH" },
  { id: 2, price: 0, camera: "Craft", lense: "Camera 4K" },
  { id: 3, price: 30, camera: "RED", lense: "EPIC-W 5K" },
  { id: 4, price: 0, camera: "Sony", lense: "Alpha a7S III" },
  { id: 5, price: 0, camera: "Nikon", lense: "Z6 II" },
  { id: 6, price: 10, camera: "Panasonic", lense: "Lumix GH5" },
  { id: 7, price: 0, camera: "Fujifilm", lense: "X-T4" },
  { id: 8, price: 0, camera: "Blackmagic", lense: "Pocket Cinema Camera 6K" },
  { id: 9, price: 0, camera: "GoPro", lense: "Hero 9 Black" },
  { id: 10, price: 0, camera: "Leica", lense: "SL2-S" },
];

const ProfileAssets =()=>{

    const [activeCategory, setActiveCategory] = useState('assets');

    const handleCategoryChange = (category) => {
        setActiveCategory(category);
    };

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
            <AssetsGrid items={assets} />
        </section>
    );
};
export default ProfileAssets