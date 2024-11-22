import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const {isAuthenticated} = useSelector(state=> state.user)
  const location = useLocation();

  return (isAuthenticated && location.pathname !== "/authorization") ? children : <Navigate to="/authorization" />;
};

export default ProtectedRoute;