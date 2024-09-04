import MainHeader from "../components/MainHeader/MainHeader";
import MainAbout from "../components/MainAbout/MainAbout";
import MainShare from "../components/MainShare/MainShare";
import HowItWorks from "../components/HowItWorks/HowItWorks";
import TutorialPreview from "../components/TutorialPreview/TutorialPreview";
import JoinCommunity from "../components/JoinCommunity/JoinCommunity";
import ScrollToTopBtn from "../components/ScrollToTopBtn/ScrollToTopBtn";

const MainPage = ()=>{
    return (
      <>
      <MainHeader/>
      <MainAbout/>
      <MainShare/>
      <HowItWorks/>
      <TutorialPreview/>
      <section>Reviews</section>
      <JoinCommunity/>
      <ScrollToTopBtn/>
      </>
    );
}

export default MainPage