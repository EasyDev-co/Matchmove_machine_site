import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "../../Button";
import Website from "../../Forms/Website";
import Portfolio from "../../Forms/Portfolio";
import AboutMe from "../../Forms/AboutMe";

const PersonalInfo = ({handlePrev,handleConfirm}) => {

  const {registerStatus} = useSelector(state=> state.user.status)
  const {registerError} = useSelector(state=> state.user.errors)

  console.log(registerStatus);
  

  const [formData, setFormData] = useState({
    website: '',
    portfolio: '',
    aboutMe: '',
  });

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    handleConfirm()
  };

  return (
    <form>
      <div className="form-group">
        <Website formData={formData} handleChange={handleChange} />
        <Portfolio formData={formData} handleChange={handleChange} />
        <AboutMe formData={formData} handleChange={handleChange} />
        <div className="full-width">
          <Button
            variant="outline-grey"
            iconType="arrowLeft"
            label="Back"
            labelPosition="right"
            onClick={handlePrev}
            type="button"
          />
          <Button
            variant="blue"
            iconType="checkMark"
            label="Register"
            labelPosition="left"
            onClick={handleFormSubmit}
            type="button"
          />
        </div>
      </div>
    </form>
  );
};

export default PersonalInfo;