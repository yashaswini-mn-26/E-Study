import React from 'react';
import { BookOpen } from 'lucide-react';
import styles from '../styles/Navbar.module.css';

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logoGroup}>
        <BookOpen className={styles.logoIcon} size={28} strokeWidth={2.5} />
        <span className={styles.brandName}>E-Study</span>
      </div>
      
      <div className={styles.userGroup}>
        <span className={styles.userName}>Yashaswini..</span>
        <div className={styles.avatarWrapper}>
          <img 
            src="/yashaswini.png" 
            alt="User Profile" 
            className={styles.avatar} 
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;