import React, { useState } from 'react';
import { BookOpen, Moon, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/authSlice';
import styles from '../styles/Login.module.css';
import { API } from "../config/api";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false); // State for visibility toggle
  const dispatch = useDispatch();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(API.login, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        dispatch(loginSuccess({ user: data.user, token: data.token }));
        window.location.href = "/Dashboard";
      } else {
        alert(data.msg || "Login failed");
      }
    } catch (err) {
      console.error("Login Error:", err);
      alert("Make sure your backend server is running on port 5000!");
    }
  };

  return (
    <div className={styles.pageContainer}>
      <nav className={styles.navbar}>
        <div className={styles.logo} onClick={() => window.location.href='/'} style={{ cursor: 'pointer' }}>
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
                    type={showPassword ? "text" : "password"} // Dynamic type switching
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

              <button type="submit" className={styles.loginBtn}>Log in</button>
            </form>
            <p className={styles.signupRedirect}>
              Don't have an account? <span className={styles.linkText} onClick={() => window.location.href="/Signup"}>Sign up</span>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;