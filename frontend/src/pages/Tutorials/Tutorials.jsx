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
        },
        {
            photo: testPhoto2,
            name: "Pidor Ivanov",
            descriprion: "jgrhefjik hriuefjkm hgutrkej hgurnj hgurefjk grefjnc grhruefj huegrknj",
          },
          {
            photo: testPhoto,
            name: "Pidor Ivanov",
            descriprion: "jgrhefjik hriuefjkm hgutrkej hgurnj hgurefjk grefjnc grhruefj huegrknj",
          },
          {
            photo: testPhoto,
            name: "Pidor Ivanov",
            descriprion: "jgrhefjik hriuefjkm hgutrkej hgurnj hgurefjk grefjnc grhruefj huegrknj",
          },
          {
            photo: testPhoto,
            name: "Pidor Ivanov",
            descriprion: "jgrhefjik hriuefjkm hgutrkej hgurnj hgurefjk grefjnc grhruefj huegrknj",
          },

      ];

    useEffect(() => {
        if (status === "idle") {
          dispatch(fetchTutorials());
        }
        console.log(tutorials);
      }, [status, dispatch]);

      useEffect(() => {
        console.log(tutorials);
      }, [tutorials, dispatch])

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
        {/* {top && (
          <Pagination
            pagination={{
              count: top?.total_page || 1, // Используем total_page
              next: top?.next_page,
              previous: top?.previus_page,
            }}
          />
        )} */}
        <div className={styles.container}>
            {test.map((item) => (
                <div className={styles.element}>
                    <img className={styles.image} src={item.photo} alt="tutorial image" />
                    <div className={styles.nameCont}>
                        <p className={styles.title}>{item.name}</p>
                        <img src={downoloadSvg} alt="downoload"/>
                    </div>
                    <p className={styles.descriprion}>{item.descriprion}</p>
                </div>
            ))}
        </div>
        {/* {top && (
          <Pagination
            pagination={{
              count: top?.total_page || 1, // Используем total_page
              next: top?.next_page,
              previous: top?.previus_page,
            }}
          />
        )} */}
      </section>
    </div>
  );
};

export default Tutorials;
