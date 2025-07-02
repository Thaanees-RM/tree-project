import React from 'react'
import { Routes, Route,} from 'react-router-dom';
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';

const App = () => {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
      </Routes>      
      <Footer/>
    </>
  );
};

export default App;
