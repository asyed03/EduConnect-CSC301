import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import  Menu  from "../components/menu";
import { LeftMenu } from "../components/left_menu";
import { CourseHighlight } from "../components/course_highlight";
import { UpcomingEvents } from "../components/upcoming_event_highlight";

function Dashboard2() {
  const [activeCourses, setActiveCourses] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    // Fetch active courses and upcoming events data
    const fetchDashboardData = async () => {
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
    };

    fetchDashboardData();
  }, []);

  return (
    <>
      <Menu />
      <LeftMenu />

      <div className="group-main">
        {/* Active Courses Section */}
        <div className="active-courses">
          <h2>Active Courses</h2>
          {activeCourses.map(course => (
            <Link to={`/courses/${course.id}`} key={course.id}>
              <CourseHighlight course={course} />
            </Link>
          ))}
        </div>

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
    </>
  );
}

export default Dashboard2;
