import React from 'react';
import { 
  LayoutDashboard, Edit3, BookOpen, Inbox, CheckSquare, 
  Bell, Lock, ShieldCheck, Key, Languages, HelpCircle, LogOut 
} from 'lucide-react';
import Navbar from '../components/Navbar';
import styles from '../styles/Settings.module.css';

const Settings: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <Navbar />
      <div className={styles.container}>
        {/* LEFT SIDEBAR - Exactly matching your green theme */}
        <aside className={styles.sidebar}>
          <nav className={styles.navGroup}>
            <button className={styles.navItem}><LayoutDashboard size={22} /> Dashboard</button>
            <button className={styles.navItem}><Edit3 size={22} /> Assignments</button>
            <button className={styles.navItem}><BookOpen size={22} /> Courses</button>
            <button className={styles.navItem}><Inbox size={22} /> Inbox</button>
            <button className={styles.navItem}><CheckSquare size={22} /> Completed</button>
          </nav>
        </aside>

        {/* RIGHT CONTENT AREA */}
        <main className={styles.mainContent}>
          <section className={styles.settingsBody}>
            <h1 className={styles.title}>Settings</h1>

            <div className={styles.optionsList}>
              <div className={styles.optionItem}>
                <Bell size={28} className={styles.icon} />
                <span>Notifications</span>
              </div>

              <div className={styles.optionItem}>
                <Lock size={28} className={styles.icon} />
                <span>Change Password</span>
              </div>

              <div className={styles.optionItem}>
                <ShieldCheck size={28} className={styles.icon} />
                <span>Security</span>
              </div>

              <div className={styles.optionItem}>
                <Key size={28} className={styles.icon} />
                <span>Enable two step verification</span>
              </div>

              <div className={styles.optionItem}>
                <Languages size={28} className={styles.icon} />
                <span>Display and Languages</span>
              </div>

              <div className={styles.optionItem}>
                <HelpCircle size={28} className={styles.icon} />
                <span>Help</span>
              </div>
            </div>

            <button className={styles.logoutFooter}>
              <LogOut size={28} /> Logout
            </button>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Settings;