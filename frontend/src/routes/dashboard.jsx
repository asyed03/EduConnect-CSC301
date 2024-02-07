import { useEffect, useState } from "react";
import "../styles/dashboard.css"
import { Link } from "react-router-dom";
import Menu from "../components/menu";
import CourseHighlight from "../components/course_highlight";
import UpcomingEvents from "../components/upcoming_event_highlight";

function Dashboard() {
  const [activeCourses, setActiveCourses] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    // Fetch active courses and upcoming events data

    async function fetchDashboardData() {
      try {
        const coursesResponse = await fetch("http://127.0.0.1:8001/courses");
        const coursesData = await coursesResponse.json();
    
        const eventsResponse = await fetch("http://127.0.0.1:8001/upcoming-events");
        const eventsData = await eventsResponse.json();
    
        setActiveCourses(coursesData);
        setUpcomingEvents(eventsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchDashboardData();
    // Example data
    const egData = {
      "activeCourses": [
        {
          "id": 1,
          "title": "React for Beginners",
          "description": "Learn the basics of React, a popular JavaScript library for building user interfaces.",
          "instructor": "John Doe",
          "noOfStudentsEnrolled": 150,
          "image": "https://picsum.photos/seed/picsum/200"
        },
        {
          "id": 2,
          "title": "Advanced React",
          "description": "Take your React skills to the next level with advanced concepts and patterns.",
          "instructor": "Jane Doe",
          "noOfStudentsEnrolled": 150,
          "image": "https://picsum.photos/seed/picsum/200"
        }
      ],
      "upcomingEvents": [
        {
          "id": 1,
          "title": "React Meetup",
          "description": "Join us for a fun and informative meetup about React.",
          "date": "2024-03-01T18:00:00Z",
          "noOfStudentsEnrolled": 15,
          "image": "https://picsum.photos/seed/picsum/200"
        },
        {
          "id": 2,
          "title": "React Workshop",
          "description": "A hands-on workshop where you'll build a small project using React.",
          "date": "2024-04-01T09:00:00Z",
          "noOfStudentsEnrolled": 10,
          "image": "https://picsum.photos/seed/picsum/200"
        }
      ]
    }

    setActiveCourses(egData["activeCourses"]);
    setUpcomingEvents(egData["upcomingEvents"]);
  }, []);

  return (
    <>
      <Menu />

      <div className="dashboard">
        <div className="group-main ">
          {/* Active Courses Section */}
          <div className="active-courses">
            <h2>Active Courses</h2>
            {activeCourses.map(course => (
              <Link to={`/courses/${course.id}`} key={course.id}>
                <CourseHighlight course={course} />
              </Link>
            ))}
          </div>
          {/* Previous Courses Section */}
          <div className="previous-courses">
            <h2>Previous Courses</h2>
            {activeCourses.map(course => (
              <Link to={`/courses/${course.id}`} key={course.id}>
                <CourseHighlight course={course} />
              </Link>
            ))}
          </div>
        </div>
        <div className="group-events">
          {/* Upcoming Events Section */}
          <div className="upcoming-events">
            <h2>Upcoming Events</h2>
            {upcomingEvents.map(event => (
              <Link to={`/events/${event.id}`} key={event.id}>
                <UpcomingEvents event={event} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
