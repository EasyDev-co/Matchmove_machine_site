import "./App.css";

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Library from "./pages/Library";
import Product from "./pages/Product";
import Authorization from "./pages/Authorization";
import Profile from "./pages/Profile";
import ProtectedRoute from "./pages/ProtectedRoute";
import Layout from "./components/Layout";
import EditProfile from "./pages/EditProfile/EditProfile";
import CheckOut from "./pages/Checkout/CheckOut";
import AffiliateProgram from "./pages/AffiliateProgram/AffiliateProgram";
import NotFound from "./pages/NotFound/NotFound";
import Faq from "./pages/Faq/Faq";
import HowTo from "./pages/HowTo/HowTo";
import FinishCheckout from "./pages/Checkout/FinishCheckout";
import ScrollToTop from "./hooks/ScrollToTop";
import CreatorProfile from "./pages/CreatorProfile";
import TermsOfUse from "./components/Footer/TermsOfUse";
import PrivacyPolicy from "./components/Footer/PrivacyPolicy";
import TopContributors from "./pages/TopContributors/TopContributors";
import Tutorials from "./pages/Tutorials/Tutorials";
import OneTutorial from "./pages/Tutorials/DetailTutorial/DetailTutorial";
import DetailTutorial from "./pages/Tutorials/DetailTutorial/DetailTutorial";
import GoogleServicePage from "./pages/ServicePage/GoogleServicePage";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/terms-of-use" element={<TermsOfUse />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route
          path="checkout"
          element={
            <ProtectedRoute>
              <CheckOut />
            </ProtectedRoute>
          }
        />
        <Route
          path="checkout/payment"
          element={
            <ProtectedRoute>
              <FinishCheckout />
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
                <Route path="profile/:profileId" element={<CreatorProfile />} />
                <Route path="profile" element={<Profile />} />
                <Route
                  path="profile/edit"
                  element={
                    <ProtectedRoute>
                      <EditProfile />
                    </ProtectedRoute>
                  }
                />
                <Route path="faq" element={<Faq />} />
                <Route path="how-it-works" element={<HowTo />} />
                <Route path="top-contributors" element={<TopContributors />} />
                <Route path="tutorials/:id" element={<DetailTutorial />} />
                <Route path="tutorials" element={<Tutorials />} />
                <Route path="/google/oauth/callback/" element={<GoogleServicePage />} />
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
