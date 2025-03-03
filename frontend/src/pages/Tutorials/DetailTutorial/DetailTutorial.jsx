import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import NavigationTop from "../../../components/NavigationTop/NavigationTop";
import { useEffect, useState } from "react";
import { fetchDetailTutorials } from "../../../store/slices/detailTutorialSlice";
import styles from "../Tutorials.module.css";
import downloadIcon from "../../../assets/svg/iconDownload.svg";
import Slider from "../../../components/Slider/Slider";
import { fetchTutorials } from "../../../store/slices/tutorialsSlice";
import testPhoto from "../../../assets/images/howTo.png";
import downoloadSvg from "../../../assets/svg/Download.svg";

const DetailTutorial = () => {
  const [visibleSlides, setVisibleSlides] = useState(3); // По умолчанию 3 слайда
  const { id } = useParams();
  const dispatch = useDispatch();
  const { detailTutorials, status, error } = useSelector(
    (state) => state.detailTutorial // Исправлено: правильный ключ (без "s" на конце)
  );

  const updateVisibleSlides = () => {
    if (window.innerWidth < 690) {
      setVisibleSlides(1); // Если ширина экрана меньше 690px, показываем 1 слайд
    } else if (window.innerWidth < 1268) {
      setVisibleSlides(2); // Если ширина экрана меньше 769px, показываем 2 слайда
    } else {
      setVisibleSlides(3); // Иначе показываем 3 слайда
    }
  };

  // Используем useEffect для обработки изменения размера окна
  useEffect(() => {
    updateVisibleSlides(); // Вызываем при первом рендере
    window.addEventListener('resize', updateVisibleSlides); // Добавляем обработчик изменения размера окна

    return () => {
      window.removeEventListener('resize', updateVisibleSlides); // Убираем обработчик при размонтировании
    };
  }, []);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchDetailTutorials(id)); // Запрашиваем данные, если статус "idle"
    }
    console.log(status);
    console.log(detailTutorials);
  }, [dispatch, id, status]);

  const { tutorials } = useSelector((state) => state.tutorials);
  const items = tutorials?.data
    ?.filter((item) => item.id !== id)
    ?.map((item) => (
      <Link
        to={`/tutorials/${item.id}`}
        key={item.id}
        className={styles.element}
      >
        <img className={styles.image} src={item.cover} alt="tutorial image" />
        <div className={styles.nameCont}>
          <p className={`${styles.title} ${styles.titleOther}`}>{item.title}</p>
          <img
            src={downoloadSvg}
            alt="download"
            onClick={(e) => {
              e.preventDefault(); // Предотвращаем переход по ссылке
              e.stopPropagation(); // Останавливаем всплытие события
              if (item.pdf) {
                handleDownload(item.pdf);
              } else {
                console.log("Файл отсутствует");
              }
            }}
            style={{ cursor: "pointer", position: "relative", zIndex: "10" }}
          />
        </div>
        <p className={`${styles.description} ${styles.descriptionOther}`}>{item.short_description}</p>
      </Link>
    ));

  const handleDownload = (pdfLink) => {
    const link = document.createElement("a");
    link.href = pdfLink;
    link.download = "file.pdf"; // Имя файла, которое будет использоваться при скачивании
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTutorials());
    }
    console.log(tutorials);
  }, [status, dispatch]);

  if (status === "loading") {
    return <p>Загрузка...</p>;
  }

  if (status === "failed") {
    return <p>Ошибка: {error}</p>;
  }

  return (
    <section>
      <div
        className={styles.titleBlock}
      >
        {detailTutorials && (
          <NavigationTop
            title={detailTutorials.title}
            singleTutorial={detailTutorials.title}
            text={detailTutorials.short_description}
          />
        )}
        <button
          className={styles.downloadButton}
          onClick={() => {
            if (detailTutorials.pdf) {
              // Проверяем, что ссылка на PDF существует
              handleDownload(detailTutorials.pdf);
            } else {
              console.log("Файл отсутствует"); // Можно добавить уведомление пользователю
            }
          }}
        >
          <p>Download</p>
          <img src={downloadIcon} alt="Download" />
        </button>
      </div>
      {/* {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}
      {status === "succeeded" && ( */}
      <div className={styles.blockDetail}>
        {detailTutorials?.blocks?.map((block, index) => (
          <div key={index}>
            {block.type == "ImageBlock" ? (
              <img style={{ borderRadius: "10px", maxWidth: "100%", height: "auto" }} src={block.image}></img>
            ) : (
              <p>{block.text}</p>
            )}
          </div>
        ))}
      </div>
      <div className={styles.otherTutorials}>
      <h2 className={`h2-medium ${styles.titleOtherTutorials}`} style={{color: "white", fontWeight: "450"}}>Other tutorials</h2>
        {tutorials?.data ? ( // Если данные есть
          <Slider items={items} visibleSlides={visibleSlides}/>
        ) : (
          <div>Загрузка данных...</div> // Если данных нет
        )}
      </div>
    </section>
  );
};

export default DetailTutorial;
