import styles from "./MiniTopContributors.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopContributors } from "../../store/slices/topContributorsSlice";
import { useEffect, useState } from "react";
import iconimg from "../../assets/images/iconplaceholder.png";
import countFiles from "../../assets/svg/countFiles.svg";
import arrowbtn from "../../assets/svg/arrowbtn.svg";
import { Link, useNavigate } from "react-router-dom";
import Slider from "../Slider/Slider";

const MiniTopContributors = () => {
  const [visibleSlides, setVisibleSlides] = useState(3); // По умолчанию 3 слайда
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { top, status, error } = useSelector((state) => state.topContributors);
  const { isAuthenticated } = useSelector((state) => state.user);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const updateVisibleSlides = () => {
    if (window.innerWidth < 450) {
      setVisibleSlides(1); // Если ширина экрана меньше 690px, показываем 1 слайд
    } else if (window.innerWidth < 690) {
      setVisibleSlides(2); // Если ширина экрана меньше 769px, показываем 2 слайда
    } else {
      setVisibleSlides(3); // Иначе показываем 3 слайда
    }
  };

  // Используем useEffect для обработки изменения размера окна
  useEffect(() => {
    updateVisibleSlides(); // Вызываем при первом рендере
    window.addEventListener("resize", updateVisibleSlides); // Добавляем обработчик изменения размера окна

    return () => {
      window.removeEventListener("resize", updateVisibleSlides); // Убираем обработчик при размонтировании
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTopContributors());
    }
    console.log(top);
  }, [status, dispatch]);

  const handleNavigation = (id) => {
    if (isAuthenticated) {
      navigate(`/profile/${id}`);
    } else {
      navigate("/authorization");
    }
  };

  const items = top?.data?.slice(0, 15).map((item, index) => (
    <div onClick={handleNavigation(item.id)} key={index} className={styles.element}>
      <p className={`${styles.number} ${styles.numberMobile}`}>
        {item.position}.
      </p>
      <div>
        <img
          className={styles.imgMobile}
          src={item.profile_picture ? item.profile_picture : iconimg}
          alt="icon"
        />
        <p className={`${styles.name} ${styles.nameMobile}`}>{item.username}</p>
        <div className={styles.countBlcok}>
          <img src={countFiles} alt="icon" />
          <p className={styles.total_products}>{item.total_products}</p>
        </div>
      </div>
    </div>
  ));

  return (
    <>
      {status === "loading" && <p>Загрузка...</p>}
      {status === "failed" && <p>Ошибка: {error}</p>}
      {status === "succeeded" && (
        <div className={styles.topContribiutors}>
          {isMobile ? (
            <>
              <div className={styles.headerTop}>
                <h2 className="h2-bold">Top Contributors</h2>
              </div>
              <Slider items={items} visibleSlides={visibleSlides} />
              <button
                onClick={() => navigate("/top-contributors")}
                className={`${styles.allButton} ${styles.allButtonMobile}`}
              >
                <span className={styles.allText}>See all</span>
                <img src={arrowbtn} alt="icon" />
              </button>
            </>
          ) : (
            <>
              <div className={styles.headerTop}>
                <h2 className="h2-bold">Top Contributors</h2>
                <button
                  onClick={() => navigate("/top-contributors")}
                  className={styles.allButton}
                >
                  <span className={styles.allText}>See all</span>
                  <img src={arrowbtn} alt="icon" />
                </button>
              </div>
              <div className={styles.topContainer}>
                {top?.data?.slice(0, 15).map((item, index) => (
                  <div
                    onClick={handleNavigation(item.id)}
                    // to={`/profile/${item.id}`}
                    key={index}
                    className={styles.user}
                  >
                    <p className={styles.number}>{item.position}.</p>
                    <img
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "5px",
                      }}
                      src={
                        item.profile_picture ? item.profile_picture : iconimg
                      }
                      alt="icon"
                    />
                    <div className={styles.info}>
                      <p className={styles.name}>{item.username}</p>
                      <div className={styles.countBlcok}>
                        <img src={countFiles} alt="icon" />
                        <p style={{ fontSize: "24px" }}>
                          {item.total_products}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default MiniTopContributors;
