import { useCallback } from "react";

function useSmoothScroll() {
  const scrollToSection = useCallback((sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const yOffset = -90; // offset by 90px
      const yPosition = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({
        top: yPosition,
        behavior: "smooth",
      });
    }
  }, []);

  return scrollToSection;
}

export default useSmoothScroll;