import React from 'react';
import { 
  LayoutDashboard, Edit3, BookOpen, Inbox, CheckSquare 
} from 'lucide-react';
import Navbar from '../components/Navbar';
import styles from '../styles/Events.module.css';

const Events: React.FC = () => {
  const eventData = [
    {
      title: "Q&A Session with mentors",
      date: "Saturday - 29/03/2025",
      time: "10:00 am to 12 :00 pm",
      bgColor: "#F3E5E5" // Light pinkish-red
    },
    {
      title: "Online Mock Interviews",
      date: "Sunday - 30/03/2025",
      time: "1:00 pm to 2 :00 pm",
      bgColor: "#E5EADD" // Light sage green
    },
    {
      title: "Online Quiz",
      date: "Wednesday - 03/04/2025",
      time: "12:00 am to 2 :00 pm",
      bgColor: "#DDE3E6" // Light blue-grey
    }
  ];

  return (
    <div className={styles.wrapper}>
      <Navbar />
      <div className={styles.container}>
        {/* SIDEBAR - Consistent with the E-Study theme */}
        <aside className={styles.sidebar}>
          <nav className={styles.navGroup}>
            <button className={styles.navItem}><LayoutDashboard size={22} /> Dashboard</button>
            <button className={styles.navItem}><Edit3 size={22} /> Assignments</button>
            <button className={styles.navItem}><BookOpen size={22} /> Courses</button>
            <button className={styles.navItem}><Inbox size={22} /> Inbox</button>
            <button className={styles.navItem}><CheckSquare size={22} /> Completed</button>
          </nav>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className={styles.mainContent}>
          <h1 className={styles.pageTitle}>Events</h1>

          <div className={styles.eventsGrid}>
            {eventData.map((event, index) => (
              <div 
                key={index} 
                className={styles.eventCard} 
                style={{ backgroundColor: event.bgColor }}
              >
                <h2 className={styles.eventTitle}>{event.title}</h2>
                <div className={styles.eventDetails}>
                  <p>{event.date}</p>
                  <p>Time = {event.time}</p>
                </div>
                <button className={styles.joinBtn}>Join the Event</button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Events;