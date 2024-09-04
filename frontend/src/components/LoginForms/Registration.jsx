import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormPopUpWrapper from "../Forms/FormPopUpWrapper";
import AuthInfo from "./Registration/AuthInfo";
import PersonalInfo from "./Registration/PersonalInfo";
import { registerArrowLeftSvg } from "../../assets/svg/svgimages";

const Registration = () => {
  const [currentStep, setCurrentStep] = useState("auth")
  const navigate = useNavigate()

  const handleNext = () => {
    setCurrentStep("personal")
  };

  const handlePrev = () => {
    setCurrentStep("auth")
  };

  const handleGoBack =()=>{
    navigate(-1)
  }
  return (
    <FormPopUpWrapper>
      <div className="login-form">
        <button className="arrowclosebtn" onClick={handleGoBack}>{registerArrowLeftSvg}</button>
        <div className="login-wrap register">
          <h2 className="h2-medium white-text">Register form</h2>
          <div className="progress-bar">
            <div
              className={`bar ${
                currentStep === "auth" || "personal" ? "active" : ""
              }`}
            ></div>
            <div
              className={`bar ${currentStep === "personal" ? "active" : ""}`}
            ></div>
          </div>
          {currentStep === "auth" && <AuthInfo handleNext={handleNext} />}
          {currentStep === "personal" && (
            <PersonalInfo handlePrev={handlePrev} />
          )}
        </div>
      </div>
    </FormPopUpWrapper>
  );
};

export default Registration;