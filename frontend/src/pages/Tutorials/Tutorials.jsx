import { useDispatch, useSelector } from "react-redux";
import NavigationTop from "../../components/NavigationTop/NavigationTop";
import styles from "./Tutorials.module.css";
// import testPhoto from "../../assets/images/testava.jpg";
import Pagination from "../../components/Pagination/Pagination";
import { useEffect } from "react";
import { Link } from 'react-router-dom';
import downoloadSvg from "../../assets/svg/Download.svg";
import { fetchTutorials } from "../../store/slices/tutorialsSlice";
import Slider from "../../components/Slider/Slider";
import testPhoto from '../../assets/images/howTo.png'

const Tutorials = () => {
    const dispatch = useDispatch();

    const { tutorials, status, error } = useSelector((state) => state.tutorials);
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
        const link = document.createElement('a');
        link.href = pdfLink;
        link.download = 'file.pdf'; // Имя файла, которое будет использоваться при скачивании
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
      <section className={`height` } style={{ paddingTop: "0" }}>
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
                <Link to={`/tutorials/${item.id}`} key={index} className={styles.element}>
                    <img className={styles.image} src={item.cover} alt="tutorial image" />
                    <div className={styles.nameCont}>
                        <p className={styles.title}>{item.title}</p>
                        <img 
                            src={downoloadSvg} 
                            alt="downoload" 
                            onClick={() => {
                              if (item.pdf) { // Проверяем, что ссылка на PDF существует
                                  handleDownload(item.pdf);
                              } else {
                                  console.log("Файл отсутствует"); // Можно добавить уведомление пользователю
                              }
                          }} 
                            style={{ cursor: 'pointer', position: 'relative', zIndex: '10', pointerEvents: 'none' }} // Добавляем курсор-указатель для лучшего UX
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
