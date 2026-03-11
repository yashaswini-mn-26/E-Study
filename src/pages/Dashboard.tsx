import React, { useState, useEffect } from 'react';
import {
  Search, ChevronLeft, ChevronRight, Play, Presentation, CalendarDays, GraduationCap, BookOpen
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // <-- Imported useNavigate
import styles from '../styles/Dashboard.module.css';
import MenuBar from '../components/MenuBar';
// Make sure you have your API URL configured correctly in this file
import { API } from '../config/api';

const Dashboard: React.FC = () => {
  // --- NAVIGATION ---
  const navigate = useNavigate(); // <-- Initialized navigate

  // --- REDUX STATE ---
  const { user, token } = useSelector((state: any) => state.auth);

  // --- DATABASE STATE ---
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- CALENDAR & CHART STATE (UNTOUCHED) ---
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

  // --- FETCH DATA FROM BACKEND ---
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Adjust this URL if your API config uses a different property for the base URL
        const backendUrl = API.dashboard;

        const response = await fetch(backendUrl, {
          method: 'GET',
          headers: {
            'x-auth-token': token,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setEnrolledCourses(data.enrolledCourses || []);
          setTasks(data.tasks || []);
          setEvents(data.events || []);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchDashboardData();
    } else {
      setIsLoading(false);
    }
  }, [token]);

  if (isLoading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading Dashboard...</div>;
  }

  return (
    <div className={styles.container}>
      <MenuBar activePage="Dashboard" />

      <main className={styles.main}>
        <div className={styles.header}>
          <div className={styles.searchBox}>
            <Search className={styles.searchIcon} size={20} />
            <input type="text" placeholder="Search for courses here...." />
          </div>
        </div>

        <section className={styles.banner} style={{ backgroundColor: "rgba(0, 0, 0, 0.05)", padding: "3%" }}>
          <div className={styles.bannerText}>
            {/* DYNAMIC USERNAME */}
            <h3 style={{ color: "#7F9651" }}>
              Hello {
                user?.name
                  ? user.name.split(' ')[0].charAt(0).toUpperCase() +
                  user.name.split(' ')[0].slice(1)
                  : 'Student'
              }.. ✨
            </h3>

            <h2 style={{ color: "black", fontWeight: "600" }}>
              Sharpen your skills with professional Online Courses
            </h2>
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
          {/* --- UPDATED NAVIGATION HERE --- */}
          <div className={styles.statCard} style={{ backgroundColor: "#D1E1E9", cursor: "pointer" }} onClick={() => navigate("/Events")}>
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
          {/* DYNAMIC COURSES WITH EMPTY STATE */}
          {enrolledCourses.length > 0 ? (
            enrolledCourses.map((enrollment, idx) => {
              // 🚨 THE FIX: If the course was deleted or missing from the DB, skip it so the app doesn't crash!
              if (!enrollment.course) return null;

              return (
                <div key={idx} className={styles.courseCard}>
                  <img src={enrollment.course.thumbnail || ""} alt={enrollment.course.title} className={styles.courseThumb} />
                  <p style={{ fontSize: "14px", marginBottom: "5px", fontWeight: "bold" }}>{enrollment.course.title}</p>
                  <div className={styles.progressRow}>
                    <div className={styles.progressBar}><div style={{ width: `${enrollment.progress}%` }}></div></div>
                    <span style={{ fontSize: "12px", color: "grey" }}>{enrollment.progress}% Completed</span>
                  </div>
                  <div className={styles.authorRow} style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "10px" }}>
                    <img src={`https://i.pravatar.cc/150?u=${idx}`} alt={enrollment.course.authorName} style={{ height: "40px", borderRadius: "50%" }} />
                    <p style={{ fontSize: "12px" }}><strong>{enrollment.course.authorName}</strong><br /> {enrollment.course.authorRole}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', width: '100%', gridColumn: '1 / -1' }}>
              <p style={{ color: 'grey', margin: 0 }}>You haven't enrolled in any courses yet. Explore courses to get started!</p>
            </div>
          )}
        </div>
      </main>

      {/* RIGHT PANEL */}
      <aside className={styles.rightPanel} style={{ padding: "0" }}>
        <div className={styles.profileSection} style={{ display: "flex", alignItems: "center", gap: "20px", backgroundColor: "rgba(127, 150, 81, 0.4)", padding: "25px" }}>
          {/* DYNAMIC AVATAR */}
          <img
            src={user?.avatar || "/yashaswini.png"}
            className={styles.avatar}
            alt={user?.name || "Student"}
            style={{ width: "60px", height: "60px", borderRadius: "50%", objectFit: "cover" }}
          />
          <div className={styles.profileInfo} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            {/* DYNAMIC NAME */}
            <h3>{user?.name || "Student"}</h3>
            <p>College Student</p>
            <button className={styles.editBtn} style={{ padding: "4px 15px", border: "none", backgroundColor: "#838f9e", color: "white", borderRadius: "4px", marginTop: "8px" }}>Edit Profile</button>
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

        {/* DYNAMIC EVENTS & TASKS (Kept your layout structure exact) */}
        {events.length > 0 && events[0] && (
          <div className={styles.eventBox} style={{ border: "1px solid grey", display: "flex", flexDirection: "column", alignItems: "center", padding: "10px", gap: "5px", borderRadius: "5px", margin: "10px" }}>
            <p>{events[0].title}</p>
            <strong>{events[0].timeWindow}</strong>
            <button style={{ padding: "3px" }}>{events[0].actionText}</button>
          </div>
        )}

        <div className={styles.todoList} style={{ border: "1px solid grey", display: "flex", flexDirection: "column", alignItems: "flex-start", padding: "15px", gap: "10px", borderRadius: "8px", margin: "10px" }}>
          <h3 style={{ alignSelf: "center" }}>To-do List</h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, width: "100%" }}>
            {tasks.length > 0 ? (
              tasks.map((task, idx) => (
                <li key={idx} className={styles.todoItem} style={{ display: "flex", gap: "10px" }}>
                  <span style={{ color: "#7F9651", fontSize: "30px" }}>•</span>
                  <div>
                    <p style={{ margin: 0 }}>{task.title}</p>
                    <small>Due: {new Date(task.dueDate).toLocaleDateString()}</small>
                  </div>
                </li>
              ))
            ) : (
              <p style={{ color: "grey", fontSize: "14px", textAlign: "center", width: "100%", margin: "10px 0" }}>No tasks due right now! 🎉</p>
            )}
          </ul>
        </div>

        {events.length > 1 && events[1] && (
          <div className={styles.eventBox} style={{ border: "1px solid grey", display: "flex", flexDirection: "column", alignItems: "center", padding: "10px", gap: "5px", borderRadius: "5px", margin: "10px" }}>
            <h3>{events[1].title}</h3>
            <p>{events[1].timeWindow}</p>
            <button style={{ padding: "3px" }}>{events[1].actionText}</button>
          </div>
        )}
      </aside>
    </div>
  );
};

export default Dashboard;