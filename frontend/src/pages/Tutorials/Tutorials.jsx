import { useDispatch, useSelector } from "react-redux";
import NavigationTop from "../../components/NavigationTop/NavigationTop";
import styles from "./Tutorials.module.css";
// import testPhoto from "../../assets/images/testava.jpg";
import Pagination from "../../components/Pagination/Pagination";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import downoloadSvg from "../../assets/svg/Download.svg";
import { fetchTutorials } from "../../store/slices/tutorialsSlice";
import Slider from "../../components/Slider/Slider";
import testPhoto from "../../assets/images/howTo.png";
import Button from "../../components/Button";

const Tutorials = () => {
  const dispatch = useDispatch();
  const { tutorials, status, error } = useSelector((state) => state.tutorials);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  // const items = tutorials?.data?.map((item) => (
  //   <Link to={`/tutorials/${item.id}`} key={item.id} className={styles.element}>
  //     <img className={styles.image} src={testPhoto} alt="tutorial image" />
  //     <div className={styles.nameCont}>
  //       <p className={styles.title}>{item.title}</p>
  //       <img
  //         src={downoloadSvg}
  //         alt="download"
  //         onClick={(e) => {
  //           e.preventDefault(); // Предотвращаем переход по ссылке
  //           e.stopPropagation(); // Останавливаем всплытие события
  //           if (item.pdf) {
  //             handleDownload(item.pdf);
  //           } else {
  //             console.log('Файл отсутствует');
  //           }
  //         }}
  //         style={{ cursor: 'pointer', position: 'relative', zIndex: '10' }}
  //       />
  //     </div>
  //     <p className={styles.description}>{item.short_description}</p>
  //   </Link>
  // ));

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
    <div>
      <NavigationTop title="Tutorials" />
      <section className={`height`} style={{ paddingTop: "0" }}>
        {tutorials && (
          <Pagination
            pagination={{
              count: tutorials?.total_page || 1, // Используем total_page
              next: tutorials?.next_page,
              previous: tutorials?.previus_page,
            }}
          />
        )}
        <div className={styles.container}>
          {tutorials?.data?.map((item, index) => (
            <Link
              to={`/tutorials/${item.id}`}
              key={index}
              className={styles.element}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className={`${styles.hoveredImage} ${hoveredIndex === index ? styles.visible : styles.hidden}`}>
                <div className={styles.readMore}>
                  Read More
                  <svg
                    width="27"
                    height="36"
                    viewBox="0 0 27 36"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M16.707 11.9908L22.364 17.6478C22.5515 17.8354 22.6568 18.0897 22.6568 18.3548C22.6568 18.62 22.5515 18.8743 22.364 19.0618L16.707 24.7188C16.5184 24.901 16.2658 25.0018 16.0036 24.9995C15.7414 24.9972 15.4906 24.8921 15.3052 24.7067C15.1198 24.5212 15.0146 24.2704 15.0123 24.0082C15.01 23.746 15.1108 23.4934 15.293 23.3048L19.243 19.3548L6 19.3548C5.73478 19.3548 5.48043 19.2495 5.29289 19.0619C5.10536 18.8744 5 18.6201 5 18.3548C5 18.0896 5.10536 17.8353 5.29289 17.6477C5.48043 17.4602 5.73478 17.3548 6 17.3548L19.243 17.3548L15.293 13.4048C15.1975 13.3126 15.1213 13.2022 15.0689 13.0802C15.0165 12.9582 14.9889 12.827 14.9877 12.6942C14.9866 12.5615 15.0119 12.4298 15.0622 12.3069C15.1125 12.184 15.1867 12.0723 15.2806 11.9784C15.3745 11.8845 15.4861 11.8103 15.609 11.76C15.7319 11.7097 15.8636 11.6844 15.9964 11.6856C16.1292 11.6867 16.2604 11.7143 16.3824 11.7667C16.5044 11.8191 16.6148 11.8953 16.707 11.9908Z" />
                  </svg>
                </div>
              </div>
              <img
                className={styles.image}
                src={item.cover}
                alt="tutorial image"
              />
              <div className={styles.nameCont}>
                <p className={styles.title}>{item.title}</p>
                <img
                  src={downoloadSvg}
                  alt="downoload"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (item.pdf) {
                      // Проверяем, что ссылка на PDF существует
                      handleDownload(item.pdf);
                    } else {
                      console.log("Файл отсутствует"); // Можно добавить уведомление пользователю
                    }
                  }}
                  style={{
                    cursor: "pointer",
                    position: "relative",
                    zIndex: "10",
                  }} // Добавляем курсор-указатель для лучшего UX
                />
              </div>
              <p className={styles.descriprion}>{item.short_description}</p>
            </Link>
          ))}
        </div>
        {tutorials && (
          <Pagination
            pagination={{
              count: tutorials?.total_page || 1, // Используем total_page
              next: tutorials?.next_page,
              previous: tutorials?.previus_page,
            }}
          />
        )}
        {/* <Slider items={items}/> */}
      </section>
    </div>
  );
};

export default Tutorials;
