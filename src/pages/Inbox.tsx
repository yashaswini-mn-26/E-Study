import React, { useState } from 'react';
import { 
  LayoutDashboard, Edit3, BookOpen, Inbox as InboxIcon, CheckSquare, 
  Search, Phone, Video, Paperclip, Smile, Camera, Mic 
} from 'lucide-react';
import Navbar from '../components/Navbar';
import styles from '../styles/Inbox.module.css';

interface Contact {
  name: string;
  time: string;
  lastSeen: string;
}

const Inbox: React.FC = () => {
  // State for Active Chat
  const [activeUser, setActiveUser] = useState<Contact>({
    name: "Yashu",
    time: "Yesterday 10:50 am",
    lastSeen: "2:02 pm"
  });

  // State for Search
  const [mentorSearch, setMentorSearch] = useState("");
  const [studentSearch, setStudentSearch] = useState("");

  const mentors = [
    { name: "Mr. Prashanth", time: "Today 09:13 am", lastSeen: "10:00 am" },
    { name: "Mr. Krupasagar", time: "Yesterday 02:56 pm", lastSeen: "Online" },
    { name: "Ms. Sunitha", time: "Yesterday 10:20 am", lastSeen: "Yesterday" }
  ];

  const students = [
    { name: "Varshitha", time: "Today 09:13 am", lastSeen: "09:15 am" },
    { name: "Namitha", time: "Yesterday 02:56 pm", lastSeen: "03:00 pm" },
    { name: "Thanu", time: "Yesterday 10:20 am", lastSeen: "11:00 am" },
    { name: "Yashu", time: "Yesterday 10:50 am", lastSeen: "2:02 pm" }
  ];

  // Filtering Logic
  const filteredMentors = mentors.filter(m => m.name.toLowerCase().includes(mentorSearch.toLowerCase()));
  const filteredStudents = students.filter(s => s.name.toLowerCase().includes(studentSearch.toLowerCase()));

  // Interaction Handlers
  const handleCall = () => alert(`Calling ${activeUser.name}...`);
  const handleVideoCall = () => alert(`Starting video chat with ${activeUser.name}...`);
  const handleEmojiClick = () => alert("Emoji picker opened!");

  return (
    <div className={styles.wrapper}>
      <Navbar />
      <div className={styles.container}>
        {/* SIDEBAR */}
        <aside className={styles.sidebar}>
          <nav className={styles.navGroup}>
            <button className={styles.navItem}><LayoutDashboard size={22} /> Dashboard</button>
            <button className={styles.navItem}><Edit3 size={22} /> Assignments</button>
            <button className={styles.navItem}><BookOpen size={22} /> Courses</button>
            <button className={`${styles.navItem} ${styles.active}`}><InboxIcon size={22} /> Inbox</button>
            <button className={styles.navItem}><CheckSquare size={22} /> Completed</button>
          </nav>
        </aside>

        {/* MESSAGES LIST COLUMN */}
        <section className={styles.messagesList}>
          <h1 className={styles.pageTitle}>Inbox</h1>
          
          <div className={styles.searchBox}>
            <Search size={18} className={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Search mentors" 
              value={mentorSearch}
              onChange={(e) => setMentorSearch(e.target.value)}
            />
          </div>

          <div className={styles.listSection}>
            {filteredMentors.map((m, i) => (
              <div 
                key={i} 
                className={`${styles.contactItem} ${activeUser.name === m.name ? styles.activeContact : ''}`}
                onClick={() => setActiveUser(m)}
              >
                <img src="/yashaswini.png" alt="Avatar" className={styles.contactAvatar} />
                <div className={styles.contactInfo}>
                  <p className={styles.contactName}>{m.name}</p>
                  <span className={styles.contactTime}>{m.time}</span>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.searchBox}>
            <Search size={18} className={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Search students" 
              value={studentSearch}
              onChange={(e) => setStudentSearch(e.target.value)}
            />
          </div>

          <div className={styles.listSection}>
            {filteredStudents.map((s, i) => (
              <div 
                key={i} 
                className={`${styles.contactItem} ${activeUser.name === s.name ? styles.activeContact : ''}`}
                onClick={() => setActiveUser(s)}
              >
                <img src="/yashaswini.png" alt="Avatar" className={styles.contactAvatar} />
                <div className={styles.contactInfo}>
                  <p className={styles.contactName}>{s.name}</p>
                  <span className={styles.contactTime}>{s.time}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ACTIVE CHAT WINDOW */}
        <section className={styles.chatWindow}>
          <header className={styles.chatHeader}>
            <div className={styles.activeUser}>
              <img src="/yashaswini.png" alt={activeUser.name} className={styles.headerAvatar} />
              <div>
                <h4>{activeUser.name}</h4>
                <p>{activeUser.lastSeen === 'Online' ? 'Online' : `Last seen ${activeUser.lastSeen}`}</p>
              </div>
            </div>
            <div className={styles.headerIcons}>
              <button onClick={handleCall} className={styles.actionBtn}><Phone size={22} fill="currentColor" /></button>
              <button onClick={handleVideoCall} className={styles.actionBtn}><Video size={24} fill="currentColor" /></button>
            </div>
          </header>

          <div className={styles.chatBody}>
            {/* Logic: These would eventually come from a messages state array based on activeUser.name */}
            <div className={styles.msgIn}>
              <div className={styles.bubbleIn}>Hey! There</div>
            </div>
            <div className={styles.msgIn}>
              <div className={styles.bubbleIn}>How are you?</div>
              <span className={styles.msgTime}>Today 09:13 am</span>
            </div>

            <div className={styles.msgOut}>
              <div className={styles.bubbleOut}>Hello {activeUser.name}</div>
            </div>
            <div className={styles.msgOut}>
              <div className={styles.bubbleOut}>I am fine and what about you</div>
              <span className={styles.msgTime}>Today 09:15 am</span>
            </div>
          </div>

          <footer className={styles.chatFooter}>
            <div className={styles.inputContainer}>
              <Paperclip className={styles.footerIcon} size={20} />
              <input type="text" placeholder="Type your message here...." />
              <div className={styles.inputExtras}>
                <Smile size={20} onClick={handleEmojiClick} className={styles.clickableIcon} />
                <Camera size={20} />
                <Mic size={20} />
              </div>
            </div>
          </footer>
        </section>
      </div>
    </div>
  );
};

export default Inbox;