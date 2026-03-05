import React from 'react';
import { 
  BookOpen, 
  Moon, 
  User, 
  Mail, 
  Lock 
} from 'lucide-react';
import styles from '../styles/Signup.module.css';

const Signup: React.FC = () => {
  return (
    <div className={styles.pageContainer}>
      {/* Top Navigation Bar */}
      <nav className={styles.navbar}>
        <div className={styles.navLeft}>
          {/* <ArrowLeft className={styles.backIcon} size={24} /> */}
          <div className={styles.logo} onClick={() => window.location.href='/'} style={{ cursor: 'pointer' }}>
            <BookOpen size={24} />
            <span>E-Study</span>
          </div>
        </div>
        <Moon className={styles.themeToggle} size={24} />
      </nav>

      <main className={styles.mainContent}>
        <h1 className={styles.welcomeTitle}>
          👋 Welcome To E-Study
        </h1>

        <div className={styles.formWrapper}>
          {/* Left Side: Illustration */}
          <div className={styles.illustrationSection}>
            <img 
              src="/Signup.png" 
              alt="Student with laptop" 
              className={styles.illustration} 
            />
          </div>

          {/* Right Side: Form */}
          <div className={styles.formSection}>
            <h2 className={styles.formTitle}>Sign up</h2>
            
            <form className={styles.signupForm}   onSubmit={(e) => {
    e.preventDefault(); 
    window.location.href = "/Login";
  }}
>
              <div className={styles.inputGroup}>
                <label>Username</label>
                <div className={styles.inputWrapper}>
                  <User className={styles.fieldIcon} size={20} />
                  <input type="text" placeholder="Enter Username" />
                </div>
              </div>

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

              <button type="submit" className={styles.signupBtn}>
                Sign Up
              </button>
            </form>

            <p className={styles.loginRedirect}>
              Already have an account? <span className={styles.linkText} onClick={() => window.location.href="/Login"}>Log in</span>
            </p>

            <div className={styles.divider}>
              <span>or</span>
            </div>

            <button className={styles.googleBtn}>
              Sign up with Google
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Signup;