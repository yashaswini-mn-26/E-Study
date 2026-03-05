import React, { useState } from 'react';
import {
  Search, ChevronLeft, ChevronRight, Play, Presentation, CalendarDays, GraduationCap, BookOpen
} from 'lucide-react';
import styles from '../styles/Dashboard.module.css';
import MenuBar from '../components/MenuBar';

const Dashboard: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [period, setPeriod] = useState("Monthly");

  const progressData: Record<string, number> = {
    Weekly: 65,
    Monthly: 80,
    Yearly: 72
  };

  const progress = progressData[period];

  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();
  const daysInMonth = new Date(year, currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, currentDate.getMonth(), 1).getDay();
  const today = new Date();
  const isToday = (day: number) =>
    today.getDate() === day &&
    today.getMonth() === currentDate.getMonth() &&
    today.getFullYear() === year;

  const changeMonth = (offset: number) => {
    const newDate = new Date(currentDate.setMonth(currentDate.getMonth() + offset));
    setCurrentDate(new Date(newDate));
  };

  const courses = [
    {
      title: "Beginner's Guide To Become Web Developer",
      thumbnail: "https://img.youtube.com/vi/rfscVS0vtbw/maxresdefault.jpg",
      author: "Prashanth Kumar",
      role: "Web Developer",
      progress: 53
    },
    {
      title: "Beginner's Guide To Become Python Developer",
      thumbnail: "https://img.youtube.com/vi/rfscVS0vtbw/maxresdefault.jpg",
      author: "Kupasagar",
      role: "Python Developer",
      progress: 33
    },
    {
      title: "Beginner's Guide To Become Java Developer",
      thumbnail: "https://img.youtube.com/vi/rfscVS0vtbw/maxresdefault.jpg",
      author: "Naveen Reddy",
      role: "Java Developer",
      progress: 87
    },
    {
      title: "Beginner's Guide for Machine Learning",
      thumbnail: "https://img.youtube.com/vi/GwIo3gDZCVQ/maxresdefault.jpg",
      author: "Harish Chowdary",
      role: "Expert in Machine Learning",
      progress: 11
    }
  ];

  return (
    <div className={styles.container}>
      {/* OUR NEW MENUBAR COMPONENT */}
      <MenuBar activePage="Dashboard" />

      {/* MAIN CONTENT */}
      <main className={styles.main}>
        <div className={styles.header}>
          <div className={styles.searchBox}>
            <Search className={styles.searchIcon} size={20} />
            <input type="text" placeholder="Search for courses here...." />
          </div>
        </div>

        <section className={styles.banner} style={{ backgroundColor: "rgba(0, 0, 0, 0.05)", padding: "3%" }}>
          <div className={styles.bannerText}>
            <h3 style={{ color: "#7F9651" }}>Hello Yashaswini.. ✨</h3>
            <h2 style={{ color: "black", fontWeight: "600" }}>Sharpen your skills with professional Online Courses</h2>
          </div>
          <button
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "#7f9651",
              color: "white",
              padding: "6px 14px",
              border: "none",
              borderRadius: "20px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
              transition: "all 0.25s ease"
            }}
          >
            <span
              style={{
                background: "white",
                borderRadius: "50%",
                width: "20px",
                height: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Play size={10} color="#7f9651" fill="#7f9651" />
            </span>
            Join Now
          </button>
        </section>

        <div className={styles.statsRow}>
          <div className={styles.statCard} style={{ backgroundColor: "#DBE9D1" }}>
            <GraduationCap size={40} />
            <h2>50k+</h2>
            <p>Total Users</p>
          </div>
          <div className={styles.statCard} style={{ backgroundColor: "#F4D9D9" }}>
            <BookOpen size={35} />
            <h2>2k+</h2>
            <p>Active Courses</p>
          </div>
          <div className={styles.statCard} style={{ backgroundColor: "#F3E8C9" }}>
            <Presentation size={35} />
            <h2>1k+</h2>
            <p>Expert Tutors</p>
          </div>
          <div className={styles.statCard} style={{ backgroundColor: "#D1E1E9", cursor: "pointer" }} onClick={() => window.location.href = "/Events"}>
            <CalendarDays size={35} />
            <h2>View Events</h2>
            <p>Upcoming Events</p>
          </div>
        </div>

        <div className={styles.chartsGrid}>
          <div className={styles.chartBox}>
            <h3 className={styles.chartTitle} style={{ marginBottom: "10px" }}>Hours Spent</h3>
            <div className={styles.legend}>
              <span><span className={styles.dot} style={{ background: "#7CA152" }}></span>Study</span>
              <span><span className={styles.dot} style={{ background: "#B4C6A6" }}></span>Assignments</span>
              <span><span className={styles.dot} style={{ background: "#8E9BAB" }}></span>Exams</span>
            </div>
            <div className={styles.barChartContainer}>
              <div className={styles.yAxis}><span>60 hr</span><span>40 hr</span><span>20 hr</span><span>0 hr</span></div>
              <div className={styles.barsRow}>
                {[{ m: "Jan", s: 50, a: 10, e: 10 }, { m: "Feb", s: 40, a: 20, e: 15 }, { m: "March", s: 50, a: 5, e: 5 }, { m: "April", s: 10, a: 20, e: 35 }].map(item => (
                  <div key={item.m} className={styles.barColumn}>
                    <div className={styles.barStack}>
                      <div className={styles.segStudy} style={{ height: `${item.s}%` }} />
                      <div className={styles.segAssign} style={{ height: `${item.a}%` }} />
                      <div className={styles.segExams} style={{ height: `${item.e}%` }} />
                    </div>
                    <span className={styles.monthLabel}>{item.m}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.chartBox}>
            <div className={styles.performanceHeader} style={{ display: 'flex', justifyContent: "space-between" }}>
              <h3 className={styles.chartTitle} style={{ marginBottom: "10px" }}>Performance</h3>
              <select value={period} onChange={(e) => setPeriod(e.target.value)} style={{ padding: '3px', borderRadius: "5px" }}>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <div style={{ height: "15px", width: "15px", backgroundColor: "#7CA152", borderRadius: "3px", display: "flex", fontSize: "12px" }}></div><p>Progress</p>
            </div>
            <div className={styles.radialContainer}>
              <div className={styles.radialProgress} style={{ background: `conic-gradient(#7CA152 0% ${progress}%, #e6e6e6 ${progress}% 100%)` }}>
                <div className={styles.radialInner}>{progress}%</div>
              </div>
              <p className={styles.progressText}>Your Progress - <strong>{progress}%</strong></p>
            </div>
          </div>
        </div>

        <h3 style={{ marginBottom: "10px" }}>Continue Watching</h3>
        <div className={styles.courseGrid}>
          {courses.map((course, idx) => (
            <div key={idx} className={styles.courseCard}>
              <img src={course.thumbnail} alt={course.title} className={styles.courseThumb} />
              <p style={{ fontSize: "14px", marginBottom: "5px", fontWeight: "bold" }}>{course.title}</p>
              <div className={styles.progressRow}>
                <div className={styles.progressBar}><div style={{ width: `${course.progress}%` }}></div></div>
                <span style={{ fontSize: "12px", color: "grey" }}>{course.progress}% Completed</span>
              </div>
              <div className={styles.authorRow} style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "10px" }}>
                <img src={`https://i.pravatar.cc/150?u=${idx}`} alt={course.author} style={{ height: "40px", borderRadius: "50%" }} />
                <p style={{ fontSize: "12px" }}><strong>{course.author}</strong><br /> {course.role}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* RIGHT PANEL */}
      <aside className={styles.rightPanel} style={{ padding: "0" }}>
        <div className={styles.profileSection} style={{ display: "flex", alignItems: "center", gap: "20px", backgroundColor: "rgba(127, 150, 81, 0.4)", padding: "25px" }}>
          <img src="/yashaswini.png" className={styles.avatar} alt="Yashaswini MN" />
          <div className={styles.profileInfo} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h3>Yashaswini MN</h3>
            <p>College Student</p>
            <button className={styles.editBtn} style={{ padding: "2px 15px", border: "none", backgroundColor: "black", color: "white", borderRadius: "4px", marginTop: "5px" }}>Edit Profile</button>
          </div>
        </div>

        <div className={styles.calendarCard} style={{ borderRadius: "0", margin: "0", backgroundColor: "rgba(0, 0, 0, 0.08)", marginBottom: "30px" }}>
          <div className={styles.calHeader}>
            <strong>{monthName} {year}</strong>
            <div><ChevronLeft size={16} onClick={() => changeMonth(-1)} style={{ cursor: 'pointer' }} /> <ChevronRight size={16} onClick={() => changeMonth(1)} style={{ cursor: 'pointer' }} /></div>
          </div>
          <div className={styles.calDays}>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => <span key={d}>{d}</span>)}
          </div>
          <div className={styles.calGrid}>
            {[...Array(firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1)].map((_, i) => <div key={`e-${i}`} />)}
            {[...Array(daysInMonth)].map((_, i) => (
              <div key={i} className={isToday(i + 1) ? styles.activeDate : ''}>{i + 1}</div>
            ))}
          </div>
        </div>

        <div className={styles.eventBox} style={{ border: "1px solid grey", display: "flex", flexDirection: "column", alignItems: "center", padding: "10px", gap: "5px", borderRadius: "5px", margin: "10px" }}>
          <p>Q&A session with mentors</p>
          <strong>03:00 PM - 05:00 PM</strong>
          <button style={{ padding: "3px" }}>Join the Event</button>
        </div>

        <div className={styles.todoList} style={{ border: "1px solid grey", display: "flex", flexDirection: "column", alignItems: "flex-start", padding: "15px", gap: "10px", borderRadius: "8px", margin: "10px" }}>
          <h3 style={{ alignSelf: "center" }}>To-do List</h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, width: "100%" }}>
            <li className={styles.todoItem} style={{ display: "flex", gap: "10px" }}>
              <span style={{ color: "#7F9651", fontSize: "30px" }}>•</span>
              <div><p style={{ margin: 0 }}>Developing a simple chat application</p><small>Submission on Sun 31st</small></div>
            </li>
            <li className={styles.todoItem} style={{ display: "flex", gap: "10px" }}>
              <span style={{ color: "#7F9651", fontSize: "30px" }}>•</span>
              <div><p style={{ margin: 0 }}>Assignment 1</p><small>Submission on Fri 29th</small></div>
            </li>
          </ul>
        </div>

        <div className={styles.eventBox} style={{ border: "1px solid grey", display: "flex", flexDirection: "column", alignItems: "center", padding: "10px", gap: "5px", borderRadius: "5px", margin: "10px" }}>
          <h3>Mock Interviews</h3>
          <p>From 11:00AM - 1:00PM</p>
          <button style={{ padding: "3px" }}>Join Mock Interview</button>
        </div>
      </aside>
    </div>
  );
};

export default Dashboard;