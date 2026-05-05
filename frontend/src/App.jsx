import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CourseView from './pages/CourseView';
import InstructorDashboard from './pages/InstructorDashboard';
import './styles/index.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course/:id" element={<CourseView />} />
        <Route path="/dashboard" element={<InstructorDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
