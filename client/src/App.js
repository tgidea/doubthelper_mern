import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.components';
import Home from './components/Home/Home.components';
import Auth from './components/Auth/Auth.components';
import Room from './components/Room/Room.components';


const App = () => {

  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />}></Route>
        <Route path="auth" element={<Auth />}></Route>
        <Route path="room" element={<Room />}></Route>
        
        <Route path=":space" element={<Home/>}></Route>
      </Route>
    </Routes>
  );
};

export default App;
