import React from 'react';
import { BookOpen } from 'lucide-react';
import { useSelector } from 'react-redux'; // <-- Import this
import type { RootState } from '../store'; // <-- Import your RootState type
import styles from '../styles/Navbar.module.css';

const Navbar: React.FC = () => {
  // Grab the user from the Redux store
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoGroup} onClick={()=>{
        window.location.href="/Dashboard"
      }} style={{cursor: "pointer"}}>
        <BookOpen className={styles.logoIcon} size={28} strokeWidth={2.5} />
        <span className={styles.brandName}>E-Study</span>
      </div>
      
      <div className={styles.userGroup}>
        {/* Display the REAL name from the database! */}
        <span className={styles.userName}>{user ? user.name : 'Guest'}</span>
        <div className={styles.avatarWrapper}>
          <img 
            src={user?.avatar || "/yashaswini.png"} 
            alt="User Profile" 
            className={styles.avatar} 
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;