import { useState } from "react"
import Button from "../../Button";
import { warningsvg } from "../../../assets/svg/svgimages";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmailCode } from "../../../store/userSlice";
import { useNavigate } from "react-router-dom";

const ConfirmEmail = () => {

  const {status} = useSelector(state=> state.user)
  const email = useSelector((state) => state.user.email);

    const [formData, setFormData] = useState({ email: email, code: '' });
    const [error, setError] = useState(null)
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
    
        try {
          await dispatch(verifyEmailCode(formData)).unwrap();
          navigate("/"); 
        } catch (error) {
          console.error("Verification failed", error);
    
          setError(error);
        }
      };

    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <h3 className="h3-medium">Confirm email</h3>
          {error && (
            <div className="error-message">
              {warningsvg} {error.message}
            </div>
          )}
          <input
            type="text"
            id="code"
            placeholder="Code from email"
            value={formData.code}
            onChange={handleChange}
          />
          <Button
            variant={status.emailVerificationStatus==="loading"? "grey":"blue"}
            iconType="arrowRight"
            label={status.emailVerificationStatus==="loading"?"Confirmation...":"Confirm"}
            type="submit"
          />
        </div>
      </form>
    );
};

export default ConfirmEmail;