import Login from "../components/LoginForms/Login";
import Registration from "../components/LoginForms/Registration";
import ModalWrap from "../components/Modal/ModalWrap";
import { useNavigate, useLocation } from "react-router-dom";

const Authorization = () => {

  const navigate = useNavigate()
  const location = useLocation()

  const onModalClose =()=>{
    navigate(-1)
  }

  return (
    <ModalWrap>
      {location.pathname==="/authorization" && <Login onModalClose={onModalClose} />}
      {location.pathname==="/registration" && <Registration onModalClose={onModalClose} />}
    </ModalWrap>
  );
};

export default Authorization;
