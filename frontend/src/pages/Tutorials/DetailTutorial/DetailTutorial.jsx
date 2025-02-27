import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NavigationTop from "../../../components/NavigationTop/NavigationTop";
import { useEffect } from "react";
import { fetchDetailTutorials } from "../../../store/slices/detailTutorialSlice";
import styles from '../Tutorials.module.css'
import downloadIcon from '../../../assets/svg/iconDownload.svg'

const DetailTutorial = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { detailTutorials, status, error } = useSelector(
    (state) => state.detailTutorial // Исправлено: правильный ключ (без "s" на конце)
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchDetailTutorials(id)); // Запрашиваем данные, если статус "idle"
    }
    console.log(status)
    console.log(detailTutorials);
  }, [dispatch, id, status]);

  const handleDownload = (pdfLink) => {
    const link = document.createElement('a');
    link.href = pdfLink;
    link.download = 'file.pdf'; // Имя файла, которое будет использоваться при скачивании
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

  if (status === "loading") {
    return <p>Загрузка...</p>;
  }

  if (status === "failed") {
    return <p>Ошибка: {error}</p>;
  }

  return (
    <section>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: '80px'}}>
      {detailTutorials &&
        <NavigationTop 
          title={detailTutorials.title} 
          singleTutorial={detailTutorials.title} 
          text={detailTutorials.short_description}
        />
      }
      <button 
        className={styles.downloadButton}
        onClick={() => {
          if (detailTutorials.pdf) { // Проверяем, что ссылка на PDF существует
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
              {block.type == 'ImageBlock' ? (
                <img style={{borderRadius: '10px'}} src={block.image}></img>
              ) : (
                <p>{block.text}</p>
              )}
            </div>
          ))}
        </div>
      {/* )} */}
    </section>
  );
};

export default DetailTutorial;