import React from 'react';
import { 
  Bell, Lock, ShieldCheck, Key, Languages, HelpCircle, LogOut 
} from 'lucide-react';
import Navbar from '../components/Navbar';
import MenuBar from '../components/MenuBar'; // <-- Imported MenuBar
import styles from '../styles/Settings.module.css';

const Settings: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <Navbar />
      <div className={styles.container}>
        
        {/* OUR SMART MENUBAR COMPONENT */}
        <MenuBar activePage="Settings" />

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

              <div className={styles.optionItem} onClick={() => window.location.href='/Help'}>
                <HelpCircle size={28} className={styles.icon} />
                <span>Help</span>
              </div>
            </div>

            <button className={styles.logoutFooter} onClick={() => window.location.href='/Login'}>
              <LogOut size={28} /> Logout
            </button>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Settings;