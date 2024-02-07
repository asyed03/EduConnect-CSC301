import { useEffect, useState } from "react";
import "../styles/Dashboard.scss"
import { Link } from "react-router-dom";
import Menu from "../components/menu";
import CourseHighlight from "../components/coursehighlight";
import UpcomingEvents from "../components/upcomingeventhighlight";

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
          "title": "CSC309",
          "description": "Learn the basics of React, a popular JavaScript library for building user interfaces.",
          "instructor": "John Doe",
          "noOfStudentsEnrolled": 150,
          "image": "https://picsum.photos/seed/picsum/200"
        },
        {
          "id": 2,
          "title": "CSC311",
          "description": "Take your React skills to the next level with advanced concepts and patterns.",
          "instructor": "Jane Doe",
          "noOfStudentsEnrolled": 150,
          "image": "https://picsum.photos/seed/picsum/200"
        },
        {
          "id": 3,
          "title": "CSC301",
          "description": "Take your React skills to the next level with advanced concepts and patterns.",
          "instructor": "Jane Doe",
          "noOfStudentsEnrolled": 150,
          "image": "https://picsum.photos/seed/picsum/200"
        },
        {
          "id": 4,
          "title": "CSC347",
          "description": "Take your React skills to the next level with advanced concepts and patterns.",
          "instructor": "Jane Doe",
          "noOfStudentsEnrolled": 150,
          "image": "https://picsum.photos/seed/picsum/200"
        }
      ],
      "upcomingEvents": [
        {
          "id": 1,
          "title": "301 Office Hours",
          "description": "Join us for a fun and informative meetup about React.",
          "date": "2024-03-01T18:00:00Z",
          "noOfStudentsEnrolled": 15,
          "image": "https://picsum.photos/seed/picsum/200"
        },
        {
          "id": 2,
          "title": "309 Office Hours",
          "description": "A hands-on workshop where you'll build a small project using React.",
          "date": "2024-04-01T09:00:00Z",
          "noOfStudentsEnrolled": 10,
          "image": "https://picsum.photos/seed/picsum/200"
        },
        {
          "id": 3,
          "title": "311 Group Study",
          "description": "A hands-on workshop where you'll build a small project using React.",
          "date": "2024-04-01T09:00:00Z",
          "noOfStudentsEnrolled": 10,
          "image": "https://picsum.photos/seed/picsum/200"
        },
        {
          "id": 4,
          "title": "347 Group Study",
          "description": "A hands-on workshop where you'll build a small project using React.",
          "date": "2024-04-01T09:00:00Z",
          "noOfStudentsEnrolled": 10,
          "image": "https://picsum.photos/seed/picsum/200"
        },
        {
          "id": 5,
          "title": "343 Office Hours",
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
        <div className="group-main">

          {/* Active Courses Section */}
          <div className="active-courses">
            <h2>Active courses</h2>
            <div className="course-block">
              {activeCourses.map(course => (
                <Link to={`/courses/${course.id}`} key={course.id}>
                  <CourseHighlight course={course} />
                </Link>
              ))}
            </div>
          </div>

          {/* Previous Courses Section */}
          <div className="active-courses">
            <h2>Completed courses</h2>
            <div className="course-block">
              {activeCourses.map(course => (
                <Link to={`/courses/${course.id}`} key={course.id}>
                  <CourseHighlight course={course} />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="group-events">
          {/* Upcoming Events Section */}
          <h2>Upcoming Events</h2>
          <div className="upcoming-events">
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
