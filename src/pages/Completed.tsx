import React from 'react';
import { 
  LayoutDashboard, Edit3, BookOpen, Inbox, CheckSquare, CheckCircle2 
} from 'lucide-react';
import Navbar from '../components/Navbar';
import styles from '../styles/Completed.module.css';

const Completed: React.FC = () => {
  const completedCourses = [
    {
      title: "Beginner's Guide To Become Web Developer",
      thumbnail: "/courseoverview.jpg",
      duration: "15hrs 25 mins",
      progress: 99
    },
    {
      title: "Beginner's Guide To Become Java Developer",
      thumbnail: "/courseoverview.jpg",
      duration: "20hrs 45 mins",
      progress: 97
    },
    {
      title: "Beginner's Guide To Become Python Developer",
      thumbnail: "/courseoverview.jpg",
      duration: "10hrs 25 mins",
      progress: 99
    }
  ];

  return (
    <div className={styles.wrapper}>
      <Navbar />
      <div className={styles.container}>
        {/* SIDEBAR - Consistent with dashboard theme */}
        <aside className={styles.sidebar}>
          <nav className={styles.navGroup}>
            <button className={styles.navItem} onClick={() => window.location.href='/Dashboard'}>
              <LayoutDashboard size={22} /> Dashboard
            </button>
            <button className={styles.navItem} onClick={() => window.location.href='/Assignments'}>
              <Edit3 size={22} /> Assignments
            </button>
            <button className={styles.navItem} onClick={() => window.location.href='/Courses'}>
              <BookOpen size={22} /> Courses
            </button>
            <button className={styles.navItem} onClick={() => window.location.href='/Inbox'}>
              <Inbox size={22} /> Inbox
            </button>
            <button className={`${styles.navItem} ${styles.active}`}>
              <CheckSquare size={22} /> Completed
            </button>
          </nav>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className={styles.mainContent}>
          <h1 className={styles.title}>Completed</h1>
          <h2 className={styles.subTitle}>Courses Completed</h2>

          <div className={styles.courseGrid}>
            {completedCourses.map((course, index) => (
              <div key={index} className={styles.courseCard}>
                <div className={styles.thumbWrapper}>
                  <img src={course.thumbnail} alt={course.title} className={styles.thumbnail} />
                </div>
                
                <div className={styles.cardInfo}>
                  <div className={styles.titleRow}>
                    <h3>{course.title}</h3>
                    <div className={styles.statusBadge}>
                      <span>Completed</span>
                      <CheckCircle2 size={16} fill="#4F6D33" color="white" />
                    </div>
                  </div>

                  <div className={styles.progressContainer}>
                    <div className={styles.progressBar}>
                      <div className={styles.progressFill} style={{ width: `${course.progress}%` }}></div>
                    </div>
                    <div className={styles.progressLabels}>
                      <span>Duration : {course.duration}</span>
                      <span>{course.progress}% Completed</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Completed;