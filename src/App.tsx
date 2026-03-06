import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux'; // <-- Added Redux hooks
import { store } from './store'; // <-- Import the store we created
import { loginSuccess } from './store/authSlice'; // <-- Import the login action
import './App.css';
import ProtectedRoute from './components/ProtectedRoute';
import { useNavigate } from 'react-router-dom';

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
          navigate("/Dashboard");
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
  }, [dispatch, navigate]);

  if (loading) return <div>Loading...</div>;

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/Settings" element={<Settings />} />
      <Route path="/Assignments" element={<Assignments />} />
      <Route path="/AssignmentDetail" element={<AssignmentDetail />} />
      <Route path="/Inbox" element={<Inbox />} />
      <Route path="/Courses" element={<Courses />} />
      <Route path="/CourseOverview" element={<CourseOverview />} />
      <Route path="/Events" element={<Events />} />
      <Route path="/Completed" element={<Completed />} />
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