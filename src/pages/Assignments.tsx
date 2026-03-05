import React from 'react';
import { Edit3 } from 'lucide-react';
import Navbar from '../components/Navbar';
import MenuBar from '../components/MenuBar'; // <-- Imported MenuBar
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
        
        {/* OUR SMART MENUBAR COMPONENT */}
        <MenuBar activePage="Assignments" />

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