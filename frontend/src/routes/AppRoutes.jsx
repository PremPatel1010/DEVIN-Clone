import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Home from '../screens/Home';
import Login from '../screens/Login';
import Register from '../screens/Register'; // Assuming you have a Register component
import Project from '../screens/Project';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/project' element={<Project />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
