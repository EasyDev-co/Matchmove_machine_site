// AuthRoute.js
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function AuthRoute({ children }) {
    const {isAuthenticated} = useSelector(state=> state.user)

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default AuthRoute;