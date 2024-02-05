import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import  Menu  from "../components/menu";
import { LeftMenu } from "../components/left_menu";

const CourseView = () => {
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [eventsData, setEventsData] = useState([]);

  useEffect(() => {
    // Fetch course details
    const fetchCourseData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8001/courses/${courseId}`);
        const data = await response.json();
        setCourseData(data);

        // Fetch events associated with the course
        const eventsResponse = await fetch(`http://127.0.0.1:8001/courses/${courseId}/events`);
        const eventsData = await eventsResponse.json();
        setEventsData(eventsData);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchCourseData();
  }, [courseId]);

  if (!courseData) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Menu />
      <LeftMenu />

      <div className="course-view">
        <div className="course-header" style={{ backgroundImage: `url(${courseData.backgroundImage})` }}>
          <h2>{courseData.courseName}</h2>
          <p>{courseData.courseDescription}</p>
        </div>

        <div className="course-details">
          <h3>Course Information</h3>
          <p>Instructor: {courseData.instructorName}</p>
          <p>Teaching Assistants: {courseData.teachingAssistants.join(', ')}</p>
          <p>Number of Students Enrolled: {courseData.numberOfStudents}</p>

          {/* Events Section */}
          <h3>Events</h3>
          <ul>
            {eventsData.map(event => (
              <li key={event.id}>
                <p>Event Name: {event.eventName}</p>
                <p>Attendees: {event.numberOfAttendees}</p>
                {/* Add more details as needed */}
              </li>
            ))}
          </ul>

          {/* Button to view messages */}
          <button onClick={() => { /* Handle click to view messages */ }}>
            View Messages
          </button>
        </div>
      </div>
    </>
  );
};

export default CourseView;
