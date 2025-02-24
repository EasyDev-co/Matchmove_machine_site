import styles from "./MiniTopContributors.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopContributors } from "../../store/slices/topContributorsSlice";
import { useEffect, useState } from "react";
import iconimg from "../../assets/images/iconplaceholder.png";
import countFiles from "../../assets/svg/countFiles.svg";
import arrowbtn from "../../assets/svg/arrowbtn.svg";
import { useNavigate } from "react-router-dom";

const MiniTopContributors = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { top, status, error } = useSelector((state) => state.topContribiutors);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

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
  return (
    <>
      {status === "loading" && <p>Загрузка...</p>}
      {status === "failed" && <p>Ошибка: {error}</p>}
      {status === "succeeded" && (
        <div className={styles.topContribiutors}>
          {isMobile ? (
            <div>mobile versions</div>
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
                  <div key={index} className={styles.user}>
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
