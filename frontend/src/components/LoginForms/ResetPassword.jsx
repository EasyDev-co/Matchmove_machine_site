import { useNavigate } from "react-router-dom";
import { useState } from "react";
import FormPopUpWrapper from "../Forms/FormPopUpWrapper";
import { registerArrowLeftSvg } from "../../assets/svg/svgimages";
import ResetPasswordForm from "./ResetPassword/ResetPasswordForm";
import FinishReset from "./ResetPassword/FinishReset";
import ResetComplete from "./ResetPassword/ResetComplete";

const ResetPassword = () => {
    const [passwordIsReset, setPasswordIsReset] = useState("start")

  const navigate = useNavigate();

  const handlePasswordReset =(status)=>{
    setPasswordIsReset(status)
  }

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <FormPopUpWrapper>
      <div className="login-form">
        <button className="arrowclosebtn" onClick={handleGoBack}>
          {registerArrowLeftSvg}
        </button>
        <div className="login-wrap register">
            {passwordIsReset === "resetting"? <FinishReset handlePasswordReset={handlePasswordReset}/>: passwordIsReset === "finished"? <ResetComplete/>: <ResetPasswordForm handlePasswordReset={handlePasswordReset}/>}
        </div>
      </div>
    </FormPopUpWrapper>
  );
};

export default ResetPassword;