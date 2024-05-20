import React from 'react';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import Persons from './Components/Persons';
import Orders from './Components/Orders';
import Locations from './Components/Locations';
import Reviews from './Components/Reviews';
import './App.css'; 
// Home page component
const Home = () => {
  return (
    <div>
      <h1>CRUD OPERATIONS ON DIFFERENT ENTITY</h1>
      <ul>
        <li><Link to="/persons">Persons</Link></li>
        <li><Link to="/orders">Orders</Link></li>
        <li><Link to="/locations">Locations</Link></li>
        <li><Link to="/reviews">Reviews</Link></li>
      </ul>
    </div>
  );
};

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/persons" element={<Persons />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/reviews" element={<Reviews />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
