import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './component/Home';
import UploadPhoto from './component/UploadPhoto';
import Navbar from './component/Navbar';
import Footer from './component/Footer'

const App = () => (
  <>
    <Navbar/>
  
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/upload" element={<UploadPhoto />} />
    </Routes>
    <Footer/>
  </>
);

export default App;
