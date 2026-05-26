import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import Events from './pages/Events';
import EventDetail from "./pages/EventDetail";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/events' element={<Events />} />
        <Route path="/events/:slug" element={<EventDetail />} />
      </Routes>
    </div>
  );
}