import React, { useState } from 'react';
import { BookOpen, Moon, User, Mail, Lock, Eye, EyeOff } from 'lucide-react'; 
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/authSlice';
import styles from '../styles/Signup.module.css';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'; // Imported Provider
import { API } from "../config/api";

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const dispatch = useDispatch();

  const validateForm = () => {
    const { email, password } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (!passwordRegex.test(password)) {
      setError("Password must be at least 8 characters, include 1 number and 1 special character.");
      return false;
    }
    setError('');
    return true;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch(API.signup, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        dispatch(loginSuccess({ user: data.user, token: data.token }));
        window.location.href = "/Dashboard";
      } else {
        setError(data.msg || "Signup failed");
      }
    } catch (err) {
      setError("Server is not running!");
    }
  };

  return (
    <div className={styles.pageContainer}>
      <nav className={styles.navbar}>
        <div className={styles.navLeft}>
          <div className={styles.logo} onClick={() => window.location.href = '/'} style={{ cursor: 'pointer' }}>
            <BookOpen size={24} />
            <span>E-Study</span>
          </div>
        </div>
        <Moon className={styles.themeToggle} size={24} />
      </nav>

      <main className={styles.mainContent}>
        <h1 className={styles.welcomeTitle}>👋 Welcome To E-Study</h1>
        <div className={styles.formWrapper}>
          <div className={styles.illustrationSection}>
            <img src="/Signup.png" alt="Student" className={styles.illustration} />
          </div>

          <div className={styles.formSection}>
            <h2 className={styles.formTitle}>Sign up</h2>

            {error && <p className={styles.errorMessage}>{error}</p>}

            <form className={styles.signupForm} onSubmit={handleSignup}>
              <div className={styles.inputGroup}>
                <label>Username</label>
                <div className={styles.inputWrapper}>
                  <User className={styles.fieldIcon} size={20} />
                  <input
                    type="text"
                    placeholder="Enter Username"
                    required
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label>Email</label>
                <div className={styles.inputWrapper}>
                  <Mail className={styles.fieldIcon} size={20} />
                  <input
                    type="email"
                    placeholder="name@example.com"
                    required
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label>Password</label>
                <div className={styles.inputWrapper}>
                  <Lock className={styles.fieldIcon} size={20} />
                  <input
                    type={showPassword ? "text" : "password"} 
                    placeholder="Min. 8 chars, 1 num, 1 special"
                    required
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className={styles.passwordInput}
                  />
                  <div
                    className={styles.eyeIconWrapper}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </div>
                </div>
              </div>

              <button type="submit" className={styles.signupBtn}>Sign Up</button>
            </form>

            <div className={styles.divider} style={{textAlign:"center", marginTop:"10px", marginBottom:"10px", color:"grey"}}><span>or</span></div>

            {/* STYLED GOOGLE BUTTON */}
            <div className={styles.googleBtnContainer} style={{ marginBottom: '1.5rem' }}>
              <GoogleOAuthProvider clientId="566226555996-7om82596lnn0q7kh6tp0ttqueeb43bdn.apps.googleusercontent.com">
                <GoogleLogin
                  onSuccess={async (credentialResponse) => {
                    console.log("Google success:", credentialResponse);
                    const token = credentialResponse.credential;

                    const res = await fetch(API.google, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({ idToken: token }),
                    });

                    const data = await res.json();

                    if (res.ok) {
                      dispatch(loginSuccess({ user: data.user, token: data.token }));
                      window.location.href = "/Dashboard";
                    } else {
                      setError(data.msg || "Google Signup failed");
                    }
                  }}
                  onError={() => console.log("Login Failed")}
                  useOneTap
                  theme="outline"
                  size="large"
                  text="continue_with"
                  shape="rectangular"
                  width="380"
                  logo_alignment="center"
                />
              </GoogleOAuthProvider>
            </div>

            <p className={styles.loginRedirect}>
              Already have an account? <span className={styles.linkText} onClick={() => window.location.href = "/Login"}>Log in</span>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Signup;