// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Popular from './pages/Popular';
import AboutUs from './pages/AboutUs';
import Categories from './pages/Categories';
import Donate from './pages/Donate';
import Withlist from './pages/Withlist';
import Card from './pages/Card';
import ShopApp from './pages/ShopApp';
import './App.css';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Popular />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/withlist" element={<Withlist />} />
        <Route path="/card" element={<Card />} />
        <Route path="/shop" element={<ShopApp />} />
        <Route path="/shop/:categoryTitle" element={<ShopApp />} /> 
      </Routes>
    </Router>
  );
};

export default App;
