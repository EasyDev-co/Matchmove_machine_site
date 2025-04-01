import { useEffect } from "react";
import MainHeader from "../components/MainHeader/MainHeader";
import MainAbout from "../components/MainAbout/MainAbout";
import MainShare from "../components/MainShare/MainShare";
import HowItWorks from "../components/HowItWorks/HowItWorks";
import TutorialPreview from "../components/TutorialPreview/TutorialPreview";
import JoinCommunity from "../components/JoinCommunity/JoinCommunity";
import ScrollToTopBtn from "../components/ScrollToTopBtn/ScrollToTopBtn";

const MainPage = () => {
  const isRedirect = 
  true;

  useEffect(() => {
    if (!window.Paddle) {
      const script = document.createElement("script");
      script.src = "https://cdn.paddle.com/paddle/paddle.js";
      script.async = true;
      script.onload = () => {
        // Скрипт загружен, можно (опционально) сразу инициализировать
        window.Paddle?.Setup({ vendor: 189185 }); 
      };
      document.body.appendChild(script);
    } else {
      // Если Paddle уже есть – инициализируем
      window.Paddle.Setup({ vendor: 189185 });
    }
  }, []);

  useEffect(() => {
    if (isRedirect) {
      window.location.href = "https://grid.matchmovemachine.com/?_gl=1*v4u310*_gcl_au*MTk5MDQxNTM5Mi4xNzM2NzU5MzQ0";
    }
  }, [isRedirect]);

  if (isRedirect) {
    return null;
  }

  return (
    <>
      <MainHeader />
      <MainAbout />
      <MainShare />
      <HowItWorks />
      <TutorialPreview />
      <JoinCommunity />
      <ScrollToTopBtn />
    </>
  );
};

export default MainPage;
