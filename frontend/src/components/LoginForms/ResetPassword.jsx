import { useNavigate } from "react-router-dom";
import { useState } from "react";
import FormPopUpWrapper from "../Forms/FormPopUpWrapper";
import { registerArrowLeftSvg } from "../../assets/svg/svgimages";
import ResetComplete from "./ResetPassword/ResetComplete";
import ResetPasswordForm from "./ResetPassword/ResetPasswordForm";
import FinishReset from "./ResetPassword/FinishReset";

const ResetPassword = () => {
    const [passwordIsReset, setPasswordIsReset] = useState(false)

  const navigate = useNavigate();

  const handlePasswordReset =()=>{
    setPasswordIsReset(true)
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
            {passwordIsReset ? <FinishReset/>: <ResetPasswordForm handlePasswordReset={handlePasswordReset}/>}
        </div>
      </div>
    </FormPopUpWrapper>
  );
};

export default ResetPassword;