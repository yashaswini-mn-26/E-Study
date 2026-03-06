import React, { useState } from 'react';
import {
  LayoutDashboard, Edit3, BookOpen, Inbox, CheckSquare,
  Settings, LogOut, HelpCircle, GraduationCap, Menu, X
} from 'lucide-react';
import styles from '../styles/Dashboard.module.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // <-- 1. Imported useNavigate
import { logout } from '../store/authSlice';

interface MenuBarProps {
  activePage: string;
}

const MenuBar: React.FC<MenuBarProps> = ({ activePage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // <-- 2. Initialized navigate

  const handleLogout = () => {
    dispatch(logout()); 
    // Note: Since we put the redirect logic inside the Slice earlier, 
    // it will automatically send you to /Login!
  };

  // This tells the component if it should be White (Dashboard) or Green (Other pages)
  const isDashboard = activePage === 'Dashboard';

  return (
    <>
      {/* MOBILE HAMBURGER HEADER - Only shows on Dashboard */}
      {isDashboard && (
        <div className={styles.mobileHeader}>
          <div style={{ display: 'flex', alignItems: 'center', fontSize: '1.5rem', fontWeight: 800 }}>
            <GraduationCap size={28} style={{ marginRight: '10px', color: '#7f9651' }} /> E-Study
          </div>
          <button className={styles.hamburgerBtn} onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      )}

      {/* FLOATING HAMBURGER - For non-dashboard pages (Sits perfectly over your black Navbar on mobile) */}
      {!isDashboard && (
         <button className={styles.floatingHamburger} onClick={() => setIsOpen(!isOpen)}>
           {isOpen ? <X size={28} color="white" /> : <Menu size={28} color="white" />}
         </button>
      )}

      {/* OVERLAY (Darkens background when menu is open) */}
      {isOpen && <div className={styles.overlay} onClick={() => setIsOpen(false)}></div>}

      {/* THE DYNAMIC SIDEBAR */}
      <aside className={`${isDashboard ? styles.sidebar : styles.greenSidebar} ${isOpen ? styles.open : ''}`}>
        
        {/* LOGO - Only render inside the sidebar if we are on the Dashboard */}
        {isDashboard && (
          <div className={styles.logo}>
            <GraduationCap size={32} style={{ marginRight: '10px' }} /> E-Study
          </div>
        )}
        
        {/* NAVIGATION LINKS */}
        <nav className={isDashboard ? styles.nav : styles.navGroup}>
          <button 
            className={`${isDashboard ? styles.navLink : styles.navItem} ${activePage === 'Dashboard' ? (isDashboard ? styles.active : styles.activeGreen) : ''}`} 
            style={isDashboard ? { width: "200px", backgroundColor: activePage === 'Dashboard' ? "#000" : "rgba(0,0,0, 0.08)" } : {}}
            onClick={() => navigate("/Dashboard")} // <-- Updated!
          >
            <LayoutDashboard size={22} /> Dashboard
          </button>
          
          <button 
            className={`${isDashboard ? styles.navLink : styles.navItem} ${activePage === 'Assignments' ? (isDashboard ? styles.active : styles.activeGreen) : ''}`} 
            style={isDashboard ? { width: "200px", backgroundColor: (activePage as string) === 'Assignments' ? "#000" : "rgba(0,0,0, 0.08)" } : {}} 
            onClick={() => navigate("/Assignments")} // <-- Updated!
          >
            <Edit3 size={22} /> Assignments
          </button>
          
          <button 
            className={`${isDashboard ? styles.navLink : styles.navItem} ${activePage === 'Courses' ? (isDashboard ? styles.active : styles.activeGreen) : ''}`} 
            style={isDashboard ? { width: "200px", backgroundColor: (activePage as string) === 'Courses' ? "#000" : "rgba(0,0,0, 0.08)" } : {}} 
            onClick={() => navigate("/Courses")} // <-- Updated!
          >
            <BookOpen size={22} /> Courses
          </button>
          
          <button 
            className={`${isDashboard ? styles.navLink : styles.navItem} ${activePage === 'Inbox' ? (isDashboard ? styles.active : styles.activeGreen) : ''}`} 
            style={isDashboard ? { width: "200px", backgroundColor: (activePage as string) === 'Inbox' ? "#000" : "rgba(0,0,0, 0.08)" } : {}} 
            onClick={() => navigate("/Inbox")} // <-- Updated!
          >
            <Inbox size={22} /> Inbox
          </button>
          
          <button 
            className={`${isDashboard ? styles.navLink : styles.navItem} ${activePage === 'Completed' ? (isDashboard ? styles.active : styles.activeGreen) : ''}`} 
            style={isDashboard ? { width: "200px", backgroundColor: (activePage as string) === 'Completed' ? "#000" : "rgba(0,0,0, 0.08)" } : {}} 
            onClick={() => navigate("/Completed")} // <-- Updated!
          >
            <CheckSquare size={22} /> Completed
          </button>
        </nav>

        {/* BOTTOM LINKS - Only show on Dashboard */}
        {isDashboard && (
          <div className={styles.sidebarBottom}>
            <button className={styles.navLinkSecondary} onClick={() => navigate('/Settings')}><Settings size={20} /> Settings</button> {/* <-- Updated! */}
            <button className={styles.navLinkSecondary} onClick={handleLogout}><LogOut size={20} /> Logout</button>
            <button className={styles.navLinkSecondary} onClick={() => navigate('/Help')}><HelpCircle size={20} /> Help Center</button> {/* <-- Updated! */}
          </div>
        )}
      </aside>
    </>
  );
};

export default MenuBar;