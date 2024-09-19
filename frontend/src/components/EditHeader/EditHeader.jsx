import styles from "./EditHeader.module.css";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

const EditHeader = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/profile/1");
  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className="h2-bold">Edit Profile</h2>
        <div className="cross">
          <Button
            variant="transparent"
            iconType="crossbtn"
            color="white"
            onClick={handleClose}
          />
        </div>
      </div>
    </div>
  );
};

export default EditHeader;
