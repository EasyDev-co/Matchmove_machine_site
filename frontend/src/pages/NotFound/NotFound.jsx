import styles from "./NotFound.module.css"
import NavigationTop from "../../components/NavigationTop/NavigationTop";
import Button from "../../components/Button";
import image from "../../assets/images/notFound.svg"
import { useNavigate } from "react-router-dom";

const NotFound =()=>{

    const navigate = useNavigate()

    const handleNavigateHomre =()=>{
        navigate("/")
    }
    return (
      <>
        <NavigationTop title="Error" />
        <section className={`height ${styles.main}`}>
          <div className={styles.imageCont}>
            <img src={image} alt="image" />
            <h2 className="h2-medium">Ooooooops! Page not found.</h2>
          </div>
          <p className={`h5-light ${styles.text}`}>
            We're sorry, but the page you are looking for could not be found. It
            seems that the link you followed may be broken or the page may have
            been removed. Please check the URL for any typos or return to the
            homepage to find what you're looking for. If you continue to
            experience this issue, please contact our support team for further
            assistance. Thank you for your understanding.
          </p>
          <div className={styles.btn}>
            <Button label="Home" iconType="home" variant="blue" onClick={handleNavigateHomre} />
          </div>
        </section>
      </>
    );
}

export default NotFound