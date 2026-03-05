import React from 'react';
import { 
  LayoutDashboard, Edit3, BookOpen, Inbox, CheckSquare, 
  PlayCircle 
} from 'lucide-react';
import Navbar from '../components/Navbar';
import styles from '../styles/CourseOverview.module.css';

const CourseOverview: React.FC = () => {
  const roadmap = [
    "Chapter 1 : Introduction",
    "Chapter 2 : HTML [Hyper Text Markup Language]",
    "Chapter 3 : CSS [Cascading Styling Sheets]",
    "Chapter 4 : JS [Javascript]",
    "Chapter 5 : NodeJs",
    "Chapter 6 : ExpressJs",
    "Chapter 7 : MongoDB"
  ];

  const playlist = [
    { part: "01", duration: "55 mins", progress: 10 },
    { part: "02", duration: "35 mins", progress: 23 },
    { part: "03", duration: "46 mins", progress: 90 },
    { part: "04", duration: "59 mins", progress: 76 },
    { part: "05", duration: "29 mins", progress: 33 },
    { part: "06", duration: "57 mins", progress: 93 },
    { part: "07", duration: "57 mins", progress: 93 },
    { part: "08", duration: "57 mins", progress: 93 },
    { part: "09", duration: "57 mins", progress: 93 },
  ];

  return (
    <div className={styles.wrapper}>
      <Navbar />
      <div className={styles.container}>
        {/* SIDEBAR */}
        <aside className={styles.sidebar}>
          <nav className={styles.navGroup}>
            <button className={styles.navItem}><LayoutDashboard size={22} /> Dashboard</button>
            <button className={styles.navItem}><Edit3 size={22} /> Assignments</button>
            <button className={`${styles.navItem} ${styles.active}`}><BookOpen size={22} /> Courses</button>
            <button className={styles.navItem}><Inbox size={22} /> Inbox</button>
            <button className={styles.navItem}><CheckSquare size={22} /> Completed</button>
          </nav>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className={styles.mainContent}>
          <div className={styles.videoSection}>
            <h1 className={styles.pageTitle}>Course Overview</h1>
            
            <div className={styles.videoPlayer}>
              <img 
                src="/courseoverview.jpg" 
                alt="Main Video" 
                className={styles.mainThumb} 
              />
              <PlayCircle className={styles.playOverlay} size={60} />
            </div>

            <div className={styles.videoInfo}>
              <h2 className={styles.videoTitle}>Beginner's Guide To Become Web Developer</h2>
              <div className={styles.mainProgressTrack}>
                <div className={styles.mainProgressFill} style={{width: '53%'}}></div>
              </div>
              <div className={styles.progressLabels}>
                <span>Duration : 5hrs 25 mins</span>
                <span>53% Completed</span>
              </div>

              <div className={styles.authorRow}>
                <img src="/yashaswini.png" alt="Prashanth" className={styles.authorImg} />
                <div>
                  <p className={styles.authorName}>Prashanth Kumar</p>
                  <p className={styles.authorRole}>Web Developer</p>
                </div>
              </div>
            </div>

            <div className={styles.roadmapSection}>
              <h3 className={styles.roadmapTitle}>Roadmap</h3>
              <ul className={styles.roadmapList}>
                {roadmap.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT PLAYLIST PANEL */}
          <aside className={styles.playlistPanel}>
            {playlist.map((item, idx) => (
              <div key={idx} className={styles.playlistCard}>
                <img 
                  src="/courseoverview.jpg" 
                  alt={`Part ${item.part}`} 
                  className={styles.miniThumb} 
                />
                <div className={styles.playlistInfo}>
                  <h4>Beginner's Guide To Become Web Developer #PART-{item.part}</h4>
                  <p>Duration : {item.duration}</p>
                  <small>{item.progress}% Completed</small>
                </div>
              </div>
            ))}
          </aside>
        </main>
      </div>
    </div>
  );
};

export default CourseOverview;