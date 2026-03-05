import React, { useState } from 'react';
import { 
  Search, Phone, Video, Paperclip, Smile, Camera, Mic, ArrowLeft 
} from 'lucide-react';
import Navbar from '../components/Navbar';
import MenuBar from '../components/MenuBar'; 
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

  // NEW: State to track if we should show the chat window on mobile
  const [showChatOnMobile, setShowChatOnMobile] = useState(false);

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

  // NEW: Handle clicking a contact (opens chat on mobile)
  const handleContactClick = (user: Contact) => {
    setActiveUser(user);
    setShowChatOnMobile(true);
  };

  return (
    <div className={styles.wrapper}>
      <Navbar />
      <div className={styles.container}>
        
        {/* OUR NEW MENUBAR COMPONENT */}
        <MenuBar activePage="Inbox" />

        {/* MESSAGES LIST COLUMN - Hides on mobile when viewing a chat */}
        <section className={`${styles.messagesList} ${showChatOnMobile ? styles.hideOnMobile : ''}`}>
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
                onClick={() => handleContactClick(m)}
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
                onClick={() => handleContactClick(s)}
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

        {/* ACTIVE CHAT WINDOW - Hides on mobile when viewing the contact list */}
        <section className={`${styles.chatWindow} ${!showChatOnMobile ? styles.hideOnMobile : ''}`}>
          <header className={styles.chatHeader}>
            <div className={styles.activeUser}>
              {/* NEW: Back Button specifically for Mobile view */}
              <button 
                className={styles.mobileBackBtn} 
                onClick={() => setShowChatOnMobile(false)}
              >
                <ArrowLeft size={24} />
              </button>

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