import { useNavigate } from "react-router-dom";
import Button from "../../Button";
import { bigCheckMark } from "../../../assets/svg/svgimages";

const ResetComplete= () => {

    const navigate = useNavigate()

    const handleClose =()=>{
        navigate("/")
    }
  return (
    <div className="form-group">
        <div className="reseted">{bigCheckMark}</div>
      <h3 className="h3-medium">
      Your password has been successfully changed.
      </h3>
      <Button variant="blue" iconType="crossbtn" label="Close" onClick={handleClose}/>
    </div>
  );
};

export default ResetComplete;