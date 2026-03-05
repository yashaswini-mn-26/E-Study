import React from 'react';
import { BookOpen, Moon } from 'lucide-react';
import styles from '../styles/Home.module.css';

const Home: React.FC = () => {
  return (
    <div className={styles.homeContainer}>
      {/* Navbar exactly like image */}
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <BookOpen size={28} strokeWidth={2.5} />
          <span>E-Study</span>
        </div>
        <div className={styles.navActions}>
          <button className={styles.outlineBtn} onClick={()=>{
            window.location.href="/Login"
          }}>Log in</button>
          <button className={styles.outlineBtn} onClick={()=>{
            window.location.href="/Signup"
          }}>Sign in</button>
          <button className={styles.iconBtn}>
            <Moon size={24} fill="white" />
          </button>
        </div>
      </nav>

      {/* Hero Header */}
      <header className={styles.heroHeader}>
        <h1>
          <span className={styles.greenText}>Welcome</span> to E-Study
        </h1>
        <p>
          A greatest <span className={styles.greenText}>E-Learning Website</span> with <span className={styles.greenText}>1k+ Expert Tutors</span>
        </p>
      </header>

      <div className={styles.dividerLine}></div>

      {/* Main Content Area */}
      <main className={styles.mainContent}>
        <div className={styles.textSection}>
          <h2 className={styles.headline}>
            Limitless learning at your <span className={styles.greenText}>fingertips</span>
          </h2>
          <p className={styles.description}>
            Online learning and teaching marketplace with <strong>2K+ Active Courses & 50K+ students</strong>. 
            Taught by <strong>1K+ Expert Tutors</strong> to help you acquire new skills.
          </p>
          
          <div className={styles.ctaWrapper}>
            <button className={styles.primaryBtn} onClick={()=>{
              window.location.href='/Signup'
            }}>Sign in to continue</button>
            <p className={styles.loginText}>
              Already a User? <span className={styles.greenLink} onClick={()=>{window.location.href="/Login"}}>Login</span>
            </p>
          </div>
        </div>

        <div className={styles.imageSection}>
          {/* Ensure your exported Figma image is in public/assets */}
          <img src="/Homepage.png" alt="E-study Illustration" />
        </div>
      </main>
    </div>
  );
};

export default Home;