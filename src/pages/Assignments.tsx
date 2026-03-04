import React from 'react';
import { 
  LayoutDashboard, Edit3, BookOpen, Inbox, CheckSquare, 
  ExternalLink 
} from 'lucide-react';
import Navbar from '../components/Navbar';
import styles from '../styles/Assignments.module.css';

const Assignments: React.FC = () => {
  const assignmentData = [
    { id: 1, subject: "UI/UX", issue: "27/03/2025", deadline: "29/03/2025", status: "Pending" },
    { id: 2, subject: "Frontend", issue: "29/03/2025", deadline: "30/03/2025", status: "Pending" },
    { id: 3, subject: "Backend", issue: "30/03/2025", deadline: "31/03/2025", status: "Completed" },
    { id: 4, subject: "Database", issue: "01/04/2025", deadline: "03/04/2025", status: "Completed" },
    { id: 5, subject: "API", issue: "02/03/2025", deadline: "04/03/2025", status: "Pending" },
  ];

  return (
    <div className={styles.wrapper}>
      <Navbar />
      <div className={styles.container}>
        {/* SIDEBAR - Matching the Settings page green */}
        <aside className={styles.sidebar}>
          <nav className={styles.navGroup}>
            <button className={styles.navItem} onClick={()=>{
                window.location.href="/Dashboard"
            }}><LayoutDashboard size={22} /> Dashboard</button>
            <button className={`${styles.navItem} ${styles.active}`} onClick={() => {window.location.href="/Assignments"}}>
              <Edit3 size={22} /> Assignments
            </button>
            <button className={styles.navItem}><BookOpen size={22} /> Courses</button>
            <button className={styles.navItem}><Inbox size={22} /> Inbox</button>
            <button className={styles.navItem}><CheckSquare size={22} /> Completed</button>
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main className={styles.mainContent}>
          <h1 className={styles.title}>Assignments</h1>

          <div className={styles.assignmentGrid}>
            {assignmentData.map((task) => (
              <div key={task.id} className={styles.card}>
                <div className={styles.cardHeader}>
                  <Edit3 size={20} /> <span>Assignment {task.id}</span>
                </div>
                <h3 className={styles.subjectText}>Subject : {task.subject}</h3>
                <div className={styles.dateInfo}>
                  <p>Issue Date - {task.issue}</p>
                  <p>Deadline - {task.deadline}</p>
                </div>
                <div className={styles.cardFooter}>
                  <span className={task.status === "Completed" ? styles.statusDone : styles.statusPending}>
                    Status : {task.status}
                  </span>
                  <button className={styles.clickBtn} onClick={()=>{
                    window.location.href="/AssignmentDetail"
                  }}>click here</button>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.summarySection}>
            <p className={styles.totalText}>Total Assignments : 5</p>
            <p>Pending : 3</p>
            <p>Completed : 2</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Assignments;