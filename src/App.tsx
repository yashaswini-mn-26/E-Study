import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import { store } from './store';
import { loginSuccess } from './store/authSlice';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute';

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
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

const AppContent: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('https://e-study-backend.onrender.com/api/auth/me', {
          headers: { 'x-auth-token': token }
        });

        if (response.ok) {
          const userData = await response.json();
          dispatch(loginSuccess({ user: userData, token }));
          
          // THE FIX: Check where the user currently is
          const currentPath = window.location.pathname;
          const publicPages = ['/', '/Login', '/Signup'];
          
          // ONLY force them to the Dashboard if they are on a login/signup/home page
          if (publicPages.includes(currentPath)) {
            navigate("/Dashboard");
          }
        } else {
          localStorage.removeItem('token');
        }
      } catch (err) {
        console.error("Auth verification failed");
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  
  }, []); 

  if (loading) return <div>Loading...</div>;

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/Login" element={<Login />} />
      
      {/* PROTECTED ROUTES */}
      <Route path="/Dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/Settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      <Route path="/Assignments" element={<ProtectedRoute><Assignments /></ProtectedRoute>} />
      <Route path="/AssignmentDetail" element={<ProtectedRoute><AssignmentDetail /></ProtectedRoute>} />
      <Route path="/Inbox" element={<ProtectedRoute><Inbox /></ProtectedRoute>} />
      <Route path="/Courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
      <Route path="/CourseOverview" element={<ProtectedRoute><CourseOverview /></ProtectedRoute>} />
      <Route path="/Events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
      <Route path="/Completed" element={<ProtectedRoute><Completed /></ProtectedRoute>} />
      
      {/* PUBLIC ROUTES */}
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
};

export default App;