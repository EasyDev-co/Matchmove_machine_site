import styles from "./ScrollToTopBtn.module.css"
import { scrolltopsvg } from "../../assets/svg/svgimages"
import { useState, useEffect } from "react"

const ScrollToTopBtn = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 900) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Smooth scroll
        });
    };

    return (
        <button className={`${styles.btn} ${isVisible ? styles.visible : styles.hidden}`} onClick={scrollToTop}>
            {scrolltopsvg}
        </button>
    );
};

export default ScrollToTopBtn;