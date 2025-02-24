import { useDispatch, useSelector } from "react-redux";
import NavigationTop from "../../components/NavigationTop/NavigationTop";
import styles from "./TopContributors.module.css";
import Pagination from "../../components/Pagination/Pagination";
import testPhoto from "../../assets/images/testava.jpg";
import countFiles from "../../assets/svg/countFiles.svg";
import { useEffect } from "react";
import { fetchTopContributors } from "../../store/slices/topContributorsSlice";
import iconimg from "../../assets/images/iconplaceholder.png";

const TopContributors = () => {
  const dispatch = useDispatch();
  const { top, status, error } = useSelector((state) => state.topContribiutors);
  
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTopContributors());
    }
    console.log(top);
  }, [status, dispatch]);

  if (status === "loading") {
    return <p>Загрузка...</p>;
  }

  if (status === "failed") {
    return <p>Ошибка: {error}</p>;
  }

  return (
    <div>
      <NavigationTop
        title="Top Contribution"
        text="We spotlight the incredible users who power the Distortion Grids Database! 
        This page recognizes our top contributors, ranked by the number of their uploaded 
        assets that have passed moderation. Your contributions are vital in building 
        a fantastic resource for the community."
      />
      <section className={`height`} style={{ paddingTop: "0" }}>
        {top && (
          <Pagination
          pagination={{
            count: top?.total_page || 1,  // Используем total_page
            next: top?.next_page,
            previous: top?.previus_page,
          }}
        />       
        )}
        <div className={styles.main}>
          {top?.data?.map((item, index) => (
            <div key={index} className={styles.user}>
              <p className={styles.number}>{item.position}.</p>
              <img
                style={{ width: "60px", height: "60px", borderRadius: "5px" }}
                src={item.profile_picture ? item.profile_picture : iconimg}
                alt="icon"
              />
              <div className={styles.info}>
                <p className={styles.name}>{item.username}</p>
                <div className={styles.countBlcok}>
                  <img src={countFiles} alt="icon" />
                  <p style={{ fontSize: "24px" }}>{item.total_products}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {top && (
          <Pagination
          pagination={{
            count: top?.total_page || 1,  // Используем total_page
            next: top?.next_page,
            previous: top?.previus_page,
          }}
        />
        
        )}
      </section>
    </div>
  );
};

export default TopContributors;
