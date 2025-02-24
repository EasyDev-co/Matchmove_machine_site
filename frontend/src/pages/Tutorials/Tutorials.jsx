import { useDispatch, useSelector } from "react-redux";
import NavigationTop from "../../components/NavigationTop/NavigationTop";
import styles from "./Tutorials.module.css";
import testPhoto from "../../assets/images/testava.jpg";
import Pagination from "../../components/Pagination/Pagination";
import { useEffect } from "react";
import { fetchTopContributors } from "../../store/slices/topContributorsSlice";
import downoloadSvg from "../../assets/svg/Download.svg";
import testPhoto2 from '../../assets/images/tutorial1.png'
import { fetchTutorials } from "../../store/slices/tutorialsSlice";

const Tutorials = () => {
    // const { top, status, error } = useSelector((state) => state.topContribiutors);
    const dispatch = useDispatch();

    const { tutorials, status, error } = useSelector((state) => state.tutorials);

    const test = [
        {
          photo: testPhoto,
          name: "Pidor Ivanov",
          descriprion: "Welcome to an in-depth exploration of Multi-Camera Geometry Tracking Technology! In this video, we'll unlock the mysteries behind this cutting-edge innovation and its incredible applications.",
          pdf: '',
        },
        {
            photo: testPhoto2,
            name: "Pidor Ivanov",
            descriprion: "jgrhefjik hriuefjkm hgutrkej hgurnj hgurefjk grefjnc grhruefj huegrknj",
            pdf: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
          },
          {
            photo: testPhoto,
            name: "Pidor Ivanov",
            descriprion: "jgrhefjik hriuefjkm hgutrkej hgurnj hgurefjk grefjnc grhruefj huegrknj",
            pdf: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
          },
          {
            photo: testPhoto,
            name: "Pidor Ivanov",
            descriprion: "jgrhefjik hriuefjkm hgutrkej hgurnj hgurefjk grefjnc grhruefj huegrknj",
            pdf: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
          },
          {
            photo: testPhoto,
            name: "Pidor Ivanov",
            descriprion: "jgrhefjik hriuefjkm hgutrkej hgurnj hgurefjk grefjnc grhruefj huegrknj",
            pdf: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
          },
      ];

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
                <div key={index} className={styles.element}>
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
                            style={{ cursor: 'pointer' }} // Добавляем курсор-указатель для лучшего UX
                        />
                    </div>
                    <p className={styles.descriprion}>{item.short_description}</p>
                </div>
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
      </section>
    </div>
  );
};

export default Tutorials;
