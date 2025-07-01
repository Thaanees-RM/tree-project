
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import JoinForm from './components/JoinForm';
import JoinFormStep2 from './components/JoinFormStep2';
import JoinFormStep3 from './components/JoinFormStep3'; 
import Certificate from './components/Certificate';
import Home from './pages/Home'


const App = () => {
  return (
    <>

      <Header/>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/join" element={<JoinForm />} />
        <Route path="/join/upload" element={<JoinFormStep2 />} />
        <Route path="/join/submit" element={<JoinFormStep3 />} />
        <Route path="/certificate" element={<Certificate />} />
      </Routes>
      <Footer/>
    </>
  )
}


export default App;
