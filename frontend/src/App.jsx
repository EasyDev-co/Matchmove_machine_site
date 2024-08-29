import './App.css';

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import Library from './pages/Library';
import Product from './pages/Product';
import Authorization from './pages/Authorization';
import Profile from './pages/Profile';
import ProtectedRoute from './pages/ProtectedRoute'; 
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="library" element={<Library />} />
          <Route path="library/product/:productId" element={<Product />} />
          <Route path="authorization" element={<Authorization />} />
          <Route path="profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;