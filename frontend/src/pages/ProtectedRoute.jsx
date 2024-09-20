import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const {isAuthenticated} = useSelector(state=> state.user)

  return isAuthenticated ? children : <Navigate to="/authorization" />;
};

export default ProtectedRoute;