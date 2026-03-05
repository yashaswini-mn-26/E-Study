import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Assignments from './pages/Assignments';
import AssignmentDetail from './pages/AssignmentDetail';
import Inbox from './pages/Inbox';
import Courses from './pages/Courses';
import CourseOverview from './pages/CourseOverview';
import Events from './pages/Events';
import Completed from './pages/Completed';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Settings" element={<Settings />} />
        <Route path="/Assignments" element={<Assignments />} />
        <Route path="/AssignmentDetail" element={<AssignmentDetail />} />
        <Route path="/Inbox" element={<Inbox />} />
        <Route path="/Courses" element={<Courses />} />
        <Route path="/CourseOverview" element={<CourseOverview />} />
        <Route path="/Events" element={<Events />} />
        <Route path="/Completed" element={<Completed />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;