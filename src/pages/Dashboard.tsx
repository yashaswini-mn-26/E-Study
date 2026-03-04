import React, { useState } from 'react';
import {
  LayoutDashboard, Edit3, BookOpen, Inbox, CheckSquare,
  Settings, LogOut, HelpCircle, Search,
 ChevronLeft, ChevronRight, 
  Play,
  CalendarDays,
  Presentation,
  GraduationCap
} from 'lucide-react';
import styles from '../styles/Dashboard.module.css';

const Dashboard: React.FC = () => {
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

  const [period, setPeriod] = useState("Monthly");

  const progressData: Record<string, number> = {
    Weekly: 65,
    Monthly: 80,
    Yearly: 72
  };

  const progress = progressData[period];


  return (
    <div className={styles.container}>
      {/* EXACT LEFT SIDEBAR */}
      <aside className={styles.sidebar}>
        <div className={styles.logo}>📖 E-Study</div>
        <nav className={styles.nav}>
          <button className={`${styles.navLink} ${styles.active}`} style={{ width: "200px" }}>
            <LayoutDashboard size={22} /> Dashboard
          </button>
          <button className={styles.navLink} style={{ backgroundColor: "rgb(0,0,0, 0.08)", width: "200px" }} onClick={()=>{
            window.location.href="/Assignments"
          }}><Edit3 size={22} /> Assignments</button>
          <button className={styles.navLink} style={{ backgroundColor: "rgb(0,0,0, 0.08)", width: "200px" }}><BookOpen size={22} /> Courses</button>
          <button className={styles.navLink} style={{ backgroundColor: "rgb(0,0,0, 0.08)", width: "200px" }}><Inbox size={22} /> Inbox</button>
          <button className={styles.navLink} style={{ backgroundColor: "rgb(0,0,0, 0.08)", width: "200px" }}><CheckSquare size={22} /> Completed</button>
        </nav>
        <div className={styles.sidebarBottom}>
          <button className={styles.navLinkSecondary} onClick={() => window.location.href='/Settings'}><Settings size={20} /> Settings</button>
          <button className={styles.navLinkSecondary} onClick={() => window.location.href='/Login'}><LogOut size={20} /> Logout</button>
          <button className={styles.navLinkSecondary} onClick={() => window.location.href='/Help'}><HelpCircle size={20} /> Help Center</button>
        </div>
      </aside>

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
            className={styles.joinBtn}
            style={{
              backgroundColor: "#7f9651",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 14px",
              borderRadius: "20px",
              border: "none",
              color: "white",
              cursor: "pointer"
            }}
          >
            <span
              style={{
                backgroundColor: "white",
                borderRadius: "50%",
                width: "28px",
                height: "28px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Play size={12} color="#7f9651" fill="#7f9651" />
            </span>

            Join Now
          </button>
        </section>
        <div className={styles.statsRow}>
          <div className={styles.statCard} style={{ backgroundColor: "#DBE9D1" }}>
            <div className={styles.iconBox}>
              <GraduationCap size={40} />
            </div>
            <h2>50k+</h2>
            <p>Total Users</p>
          </div>

          <div className={styles.statCard} style={{ backgroundColor: "#F4D9D9" }}>
            <div className={styles.iconBox}>
              <BookOpen size={35} />
            </div>
            <h2>2k+</h2>
            <p>Active Courses</p>
          </div>

          <div className={styles.statCard} style={{ backgroundColor: "#F3E8C9" }}>
            <div className={styles.iconBox}>
              <Presentation size={35} />
            </div>
            <h2>1k+</h2>
            <p>Expert Tutors</p>
          </div>

          <div className={styles.statCard} style={{ backgroundColor: "#D1E1E9" }}>
            <div className={styles.iconBox}>
              <CalendarDays size={35} />
            </div>
            <h2>View Events</h2>
            <p>Upcoming Events</p>
          </div>
        </div>

  <div className={styles.chartsGrid}>

  {/* HOURS SPENT */}
  <div className={styles.chartBox}>
    <h3 className={styles.chartTitle}>Hours Spent</h3>

    <div className={styles.legend}>
      <span><span className={styles.dot} style={{ background: "#7CA152" }}></span>Study</span>
      <span><span className={styles.dot} style={{ background: "#B4C6A6" }}></span>Assignments</span>
      <span><span className={styles.dot} style={{ background: "#8E9BAB" }}></span>Exams</span>
    </div>

    <div className={styles.barChartContainer}>
      <div className={styles.yAxis}>
        <span>60 hr</span>
        <span>40 hr</span>
        <span>20 hr</span>
        <span>0 hr</span>
      </div>

      <div className={styles.barsRow}>
        {[
          { m: "Jan", s: 50, a: 10, e: 10 },
          { m: "Feb", s: 40, a: 20, e: 15 },
          { m: "March", s: 50, a: 5, e: 5 },
          { m: "April", s: 10, a: 20, e: 35 }
        ].map(item => (
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

  {/* PERFORMANCE */}
 <div className={styles.chartBox}>

      <div className={styles.performanceHeader}>
        <h3 className={styles.chartTitle}>Performance</h3>

        <select
          className={styles.dropdownSelect}
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          style={{padding:'3px', borderRadius:"5px"}}
        >
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
          <option value="Yearly">Yearly</option>
        </select>
      </div>

      <div className={styles.progressLegend}>
        <span className={styles.dot} style={{ background: "#7CA152", margin:"0" }}></span>
        Progress
      </div>

      <div className={styles.radialContainer}>
        <div
          className={styles.radialProgress}
          style={{
            background: `conic-gradient(
              #7CA152 0% ${progress}%,
              #e6e6e6 ${progress}% 100%
            )`
          }}
        >
          <div className={styles.radialInner}>{progress}%</div>
        </div>

        <p className={styles.progressText}>
          Your Progress - <strong>{progress}%</strong>
        </p>
      </div>

    </div>

</div>

        <div className={styles.continueHeader}>
          <h3>Continue Watching</h3>
          {/* <button className={styles.seeAllBtn}>See All →</button> */}
        </div>
        <div className={styles.courseGrid}>
          {courses.map((course, idx) => (
            <div key={idx} className={styles.courseCard}>
              <img src={course.thumbnail} alt={course.title} className={styles.courseThumb} />
              <h4>{course.title}</h4>
              <div className={styles.progressRow}>
                <div className={styles.progressBar}><div style={{ width: `${course.progress}%` }}></div></div>
                <span>{course.progress}% Completed</span>
              </div>
              <div className={styles.authorRow} style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "10px" }}>
                <img src={`https://i.pravatar.cc/150?u=${idx}`} alt={course.author} style={{height:"40px", borderRadius:"50%"}}/>
              
                  <p className={styles.authorName}><strong>{course.author}</strong><br></br> {course.role}</p>
                  {/* <p className={styles.authorRole}>{course.role}</p> */}
                    <div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* RIGHT PANEL (EXACT PROFILE & CALENDAR) */}
      <aside className={styles.rightPanel} style={{ padding: "0" }}>
        <div className={styles.profileSection} style={{ display: "flex", alignItems: "center", gap: "20px", backgroundColor: "rgba(127, 150, 81, 0.4)", padding: "25px" }}>
          <img src="/yashaswini.png" className={styles.avatar} alt="Yashaswini MN" />
          <div className={styles.profileInfo}>
            <h3>Yashaswini MN</h3>
            <p>College Student</p>
            <button className={styles.editBtn}>👤 Edit Profile</button>
          </div>
          {/* <Moon size={20} className={styles.moonIcon} /> */}
        </div>

        <div className={styles.calendarCard} style={{ borderRadius: "0", margin: "0", backgroundColor: "rgba(0, 0, 0, 0.08)", marginBottom: "30px" }}>
          <div className={styles.calHeader}>
            <strong>March 2025</strong>
            <div><ChevronLeft size={16} /> <ChevronRight size={16} /></div>
          </div>
          <div className={styles.calDays}>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => <span key={d}>{d}</span>)}
          </div>
          <div className={styles.calGrid}>
            {[...Array(31)].map((_, i) => (
              <div key={i} className={i + 1 === 28 ? styles.activeDate : ''}>{i + 1}</div>
            ))}
          </div>
        </div>

        <div className={styles.eventBox} style={{ border: "1px solid grey", display: "flex", flexDirection: "column", alignItems: "center", padding: "10px", gap: "5px", borderRadius: "5px", margin: "10px" }}>
          <p>Q&A session with mentors</p>
          <strong>03:00 PM - 05:00 PM</strong>
          <button style={{ padding: "3px" }}>Join the Event</button>
        </div>

        <div
          className={styles.todoList}
          style={{
            border: "1px solid grey",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",   // align left
            padding: "15px",
            gap: "10px",
            borderRadius: "8px",
            margin: "10px"
          }}
        >
          <h3 style={{ alignSelf: "center" }}>To-do List</h3>

          <ul style={{ listStyle: "none", padding: 0, margin: 0, width: "100%" }}>

            <li className={styles.todoItem} style={{ display: "flex", gap: "10px" }}>
              <span style={{ color: "#7F9651", fontSize: "30px" }}>•</span>
              <div>
                <p style={{ margin: 0 }}>Developing a simple chat application</p>
                <small>Submission on Sun 31st</small>
              </div>
            </li>

            <li className={styles.todoItem} style={{ display: "flex", gap: "10px" }}>
              <span style={{ color: "#7F9651", fontSize: "30px" }}>•</span>
              <div>
                <p style={{ margin: 0 }}>Assignment 1</p>
                <small>Submission on Fri 29th</small>
              </div>
            </li>

            <li className={styles.todoItem} style={{ display: "flex", gap: "10px" }}>
              <span style={{ color: "#7F9651", fontSize: "30px" }}>•</span>
              <div>
                <p style={{ margin: 0 }}>Training Datasets</p>
                <small>Submission on Mon 1st</small>
              </div>
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