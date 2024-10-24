import styles from "./ContributionForm.module.css";

const ThankYouMessage =()=>{
    return <div className={styles.messageCont}>
        <h2 className={`h2-bold`}>Thank you!</h2>
        <p className={`${styles.messageText}`}>We have received your upload and will notify you by email when it has been reviewed by our team. Once approved, we will also send you a promo code for 15% discount on any purchase in Distortion Grids Database.</p>
    </div>
}

export default ThankYouMessage