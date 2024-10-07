import styles from "./LoadingScreen.module.css"
import img from "../../assets/images/loading.svg"

const LoadingScreen = () => {
    return (
        <div className={styles.main}>
            <div className={styles.conent}>
                <img src={img} alt="loading" />
                <h2 className="h2-medium">
                    Loading<span className={styles.dots}></span>
                </h2>
            </div>
        </div>
    );
};

export default LoadingScreen;
