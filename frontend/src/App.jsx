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
import EditProfile from './pages/EditProfile/EditProfile';
import CheckOut from './pages/Checkout/CheckOut';
import AffiliateProgram from './pages/AffiliateProgram/AffiliateProgram';
import NotFound from './pages/NotFound/NotFound';
import Faq from './pages/Faq/Faq';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="checkout"
          element={
            <ProtectedRoute>
              <CheckOut />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="library" element={<Library />} />
                <Route
                  path="library/product/:productId"
                  element={<Product />}
                />
                <Route
                  path="affiliate-program"
                  element={<AffiliateProgram />}
                />
                <Route path="authorization" element={<Authorization />} />
                <Route path="registration" element={<Authorization />} />
                <Route path="reset-password" element={<Authorization />} />
                <Route
                  path="profile/:id"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="profile/edit"
                  element={
                    <ProtectedRoute>
                      <EditProfile />
                    </ProtectedRoute>
                  }
                />
                <Route path="faq" element={<Faq />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;