import React from 'react';
import { BookOpen, Moon, Mail, Lock } from 'lucide-react';
import styles from '../styles/Login.module.css';

const Login: React.FC = () => {
  return (
    <div className={styles.pageContainer}>
      {/* Header matching the design */}
      <nav className={styles.navbar}>
        <div className={styles.logo} onClick={() => window.location.href='/'} style={{ cursor: 'pointer' }}>
          <BookOpen size={24} />
          <span>E-Study</span>
        </div>
        <Moon className={styles.themeToggle} size={24} />
      </nav>

      <main className={styles.mainContent}>
        <h1 className={styles.welcomeTitle}>
          👋 Welcome Back
        </h1>

        <div className={styles.formWrapper}>
          {/* Left Side: Student Illustration */}
          <div className={styles.illustrationSection}>
            <img 
              src="/Login.png" 
              alt="Student studying" 
              className={styles.illustration} 
            />
          </div>

          {/* Right Side: Log in Form */}
          <div className={styles.formSection}>
            <h2 className={styles.formTitle}>Log in</h2>
            
            <form className={styles.loginForm}   onSubmit={(e) => {
    e.preventDefault();
    window.location.href = "/Dashboard";
  }}
>
              <div className={styles.inputGroup}>
                <label>Email or Phone</label>
                <div className={styles.inputWrapper}>
                  <Mail className={styles.fieldIcon} size={20} />
                  <input type="text" placeholder="Enter your Email or Phone number" />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label>Password</label>
                <div className={styles.inputWrapper}>
                  <Lock className={styles.fieldIcon} size={20} />
                  <input type="password" placeholder="Enter Your Password" />
                </div>
              </div>

              <div className={styles.forgotPasswordRow}>
                <label className={styles.checkboxContainer}>
                  <input type="checkbox" />
                  <span className={styles.checkmark}></span>
                  Forgot Password
                </label>
              </div>

              <button type="submit" className={styles.loginBtn} onClick={()=>{
                window.location.href="/Dashboard"
              }}>
                Log in
              </button>
            </form>

            <p className={styles.signupRedirect}>
              Don't have an account? <span className={styles.linkText} onClick={()=>{
                window.location.href="/Signup"
              }}>Sign up</span>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;