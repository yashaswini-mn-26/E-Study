import React, { useState } from 'react';
import { BookOpen, Moon, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { loginSuccess } from '../store/authSlice';
import styles from '../styles/Login.module.css';
import { API } from "../config/api";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // --- STANDARD EMAIL/PASSWORD LOGIN ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      const response = await fetch(API.login || 'http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        dispatch(loginSuccess({ user: data.user, token: data.token }));
        navigate("/Dashboard");
      } else {
        setError(data.msg || "Login failed");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError("Server is not responding. Make sure your backend is running!");
    }
  };

  // --- GOOGLE OAUTH LOGIN ---
  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken: credentialResponse.credential }),
      });

      const data = await res.json();

      if (res.ok) {
        dispatch(loginSuccess({ user: data.user, token: data.token }));
        navigate("/Dashboard");
      } else {
        setError(data.msg || "Google Login failed");
      }
    } catch (err) {
      setError("Connection to server failed");
    }
  };

  return (
    <div className={styles.pageContainer}>
      <nav className={styles.navbar}>
        <div className={styles.logo} onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <BookOpen size={24} />
          <span>E-Study</span>
        </div>
        <Moon className={styles.themeToggle} size={24} />
      </nav>

      <main className={styles.mainContent}>
        <h1 className={styles.welcomeTitle}>👋 Welcome Back</h1>
        
        <div className={styles.formWrapper}>
          <div className={styles.illustrationSection}>
            <img src="/Login.png" alt="Student studying" className={styles.illustration} />
          </div>

          <div className={styles.formSection}>
            <h2 className={styles.formTitle}>Log in</h2>
            
            {/* Display error messages cleanly */}
            {error && <p style={{ color: '#ff4d4d', fontSize: '0.9rem', marginBottom: '10px', background: '#fff5f5', padding: '8px', borderRadius: '5px', borderLeft: '4px solid #ff4d4d' }}>{error}</p>}

            <form className={styles.loginForm} onSubmit={handleLogin}>
              <div className={styles.inputGroup}>
                <label>Email</label>
                <div className={styles.inputWrapper}>
                  <Mail className={styles.fieldIcon} size={20} />
                  <input 
                    type="email" 
                    placeholder="Enter your Email" 
                    required
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label>Password</label>
                <div className={styles.inputWrapper}>
                  <Lock className={styles.fieldIcon} size={20} />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Enter Your Password" 
                    required
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                  <div 
                    className={styles.eyeIconWrapper} 
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </div>
                </div>
              </div>

              {/* FORGOT PASSWORD LINK */}
              <div style={{ textAlign: 'right', marginBottom: '1.5rem', marginTop: '-0.5rem' }}>
                <span 
                  className={styles.linkText} 
                  style={{ fontSize: '0.9rem', cursor: 'pointer', fontWeight: 500 }}
                  onClick={() => navigate("/forgot-password")}
                >
                  Forgot Password?
                </span>
              </div>

              <button type="submit" className={styles.loginBtn}>Log in</button>
            </form>

            <div className={styles.divider} style={{textAlign:"center", marginTop:"10px", marginBottom:"10px", color:"grey"}}><span>or</span></div>

            {/* PRODUCTION READY GOOGLE BUTTON */}
            <div className={styles.googleBtnContainer} style={{ marginBottom: '1.5rem' }}>
              <GoogleOAuthProvider clientId="566226555996-7om82596lnn0q7kh6tp0ttqueeb43bdn.apps.googleusercontent.com">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => setError("Google Login window closed or failed")}
                  useOneTap
                  theme="outline"
                  size="large"
                  text="continue_with"
                  shape="circle"
                  width="100%"
                />
              </GoogleOAuthProvider>
            </div>

            <p className={styles.signupRedirect}>
              Don't have an account? <span className={styles.linkText} onClick={() => navigate("/Signup")}>Sign up</span>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;