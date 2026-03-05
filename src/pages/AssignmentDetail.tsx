import React from 'react';
import Navbar from '../components/Navbar';
import MenuBar from '../components/MenuBar'; // <-- Imported MenuBar
import styles from '../styles/AssignmentDetail.module.css';

const AssignmentDetail: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <Navbar />
      <div className={styles.container}>
        {/* OUR SMART MENUBAR COMPONENT */}
        <MenuBar activePage="Assignments" />

        {/* MAIN CONTENT AREA */}
        <main className={styles.mainContent}>
          <h1 className={styles.assignmentTitle}>Assignment - 01</h1>
          
          <section className={styles.contentBody}>
            <h2 className={styles.subjectHeader}>Subject : UI/UX</h2>
            
            <p className={styles.instructionText}>
              Design a Figma for LMS [Learning Management System] which is responsive for every screen resolution.
            </p>

            <div className={styles.requirementsSection}>
              <p className={styles.listTitle}>The Figma should include following functionalities :</p>
              <ol className={styles.orderedList}>
                <li>Login</li>
                <li>Logout</li>
                <li>Dashboard</li>
                <li>Courses</li>
                <li>Course Overview</li>
                <li>Inbox</li>
                <li>Progress</li>
                <li>Events</li>
              </ol>
            </div>

            <div className={styles.uploadSection}>
              <p className={styles.uploadTitle}>Upload Your Completed Assigment Work or Send us Link</p>
              
              <div className={styles.fileInputRow}>
                <div className={styles.fileInputBox}>
                  <span className={styles.placeholderText}>No file choosen</span>
                  <button className={styles.chooseFileBtn} style={{color:"white", backgroundColor:"#7CA152"}}>Choose file</button>
                </div>
              </div>

              <div className={styles.linkInputRow}>
                <input 
                  type="text" 
                  placeholder="Paste your assignment link" 
                  className={styles.linkInput}
                />
              </div>

              <p className={styles.deadlineText}>Deadline : 29/03/2025</p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AssignmentDetail;