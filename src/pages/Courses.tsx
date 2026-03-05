import React, { useState } from 'react';
import { Search } from 'lucide-react';
import Navbar from '../components/Navbar';
import MenuBar from '../components/MenuBar'; // <-- Imported MenuBar
import styles from '../styles/Courses.module.css';

const Courses: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const allCourses = [
    {
      id: 1,
      title: "Beginner's Guide To Become Web Developer",
      thumb: "https://img.youtube.com/vi/zJSY8tJY_Xo/maxresdefault.jpg",
      author: "Prashanth Kumar",
      role: "Web Developer",
      duration: "5hrs 25 mins",
      progress: 53
    },
    {
      id: 2,
      title: "Beginner's Guide To Become Python Developer",
      thumb: "https://img.youtube.com/vi/rfscVS0vtbw/maxresdefault.jpg",
      author: "Kupasagar",
      role: "Python Developer",
      duration: "8hrs 55 mins",
      progress: 33
    },
    {
      id: 3,
      title: "Beginner's Guide To Become Java Developer",
      thumb: "https://img.youtube.com/vi/A74ToWnie7I/maxresdefault.jpg",
      author: "Naveen Reddy",
      role: "Java Developer",
      duration: "10hrs 45 mins",
      progress: 87
    },
    {
      id: 4,
      title: "Beginner's Guide for Machine Learning",
      thumb: "https://img.youtube.com/vi/GwIo3gDZCVQ/maxresdefault.jpg",
      author: "Harish Chowdary",
      role: "Experty in Machine Learning",
      duration: "21hrs 17 mins",
      progress: 11
    }
  ];

  // Doubling the array to match the two-row layout in courses.jpg
  const displayCourses = [...allCourses, ...allCourses].filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.wrapper}>
      <Navbar />
      <div className={styles.container}>
        
        {/* OUR SMART MENUBAR COMPONENT */}
        <MenuBar activePage="Courses" />

        {/* MAIN CONTENT */}
        <main className={styles.mainContent}>
          <header className={styles.mainHeader}>
            <h1 className={styles.pageTitle}>Courses</h1>
            <div className={styles.searchContainer}>
              <Search className={styles.searchIcon} size={20} />
              <input 
                type="text" 
                placeholder="Search for courses here...." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </header>

          <h2 className={styles.subTitle}>Available courses</h2>

          <div className={styles.courseGrid} onClick={()=>{
            window.location.href="/CourseOverview"
          }} style={{cursor:"pointer"}}>
            {displayCourses.map((course, idx) => (
              <div key={idx} className={styles.courseCard}>
                <div className={styles.thumbWrapper}>
                  <img src={course.thumb} alt={course.title} className={styles.thumbnail} />
                </div>
                <h3 className={styles.courseTitle}>{course.title}</h3>
                
                <div className={styles.progressContainer}>
                  <div className={styles.progressBar}>
                    <div className={styles.progressFill} style={{width: `${course.progress}%`}}></div>
                  </div>
                  <div className={styles.progressLabels}>
                    <span>Duration : {course.duration}</span>
                    <span>{course.progress}% Completed</span>
                  </div>
                </div>

                <div className={styles.authorSection}>
                  <img src="/yashaswini.png" alt="Avatar" className={styles.authorAvatar} />
                  <div className={styles.authorInfo}>
                    <p className={styles.authorName}>{course.author}</p>
                    <p className={styles.authorRole}>{course.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.footerAction}>
            <button className={styles.seeMoreBtn}>See more</button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Courses;