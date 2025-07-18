
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Join from "./components/JoinForm";
import Upload from "./components/joinFormStep2";
import Submit from "./components/joinFormStep3";
import AboutUs from "./pages/AboutUs";
import ScrollToTop from './components/ScrollToTop';


const App = () => {
  return (
    <>
      <ScrollToTop/>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/join" element={<Join />} />
        <Route path="/join/upload" element={<Upload />} />
        <Route path="/join/submit" element={<Submit />} />       
        <Route path="*" element={<h1 className="text-center text-2xl mt-10">404 - Page Not Found</h1>} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
