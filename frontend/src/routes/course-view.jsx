// CourseView.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Menu from '../components/menu';
import '../styles/CourseView.scss';
import AnnouncementHighlight from '../components/announcementhighlight';

const CourseView = () => {
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [eventsData, setEventsData] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        if (!courseId) {
          // Set default data if courseId is not provided
          setCourseData({
            courseName: 'Introduction to React Development',
            courseDescription: 'Learn the fundamentals of React development and build modern web applications.',
            instructorName: 'Jane Smith',
            teachingAssistants: ['TA1', 'TA2', 'TA3'],
            numberOfStudents: 120,
            backgroundImage: 'https://picsum.photos/seed/picsum/200',
          });

          setEventsData([
            { id: 1, eventName: 'Orientation Session', numberOfAttendees: 50 },
            { id: 2, eventName: 'Hands-on Workshop', numberOfAttendees: 80 },
          ]);

          setAnnouncements([
            { poster: "Ibrahim", message: "This is a test announcement for this course.", date: new Date(Date.now()) },
            { poster: "Ibrahim 2", message: "This is yet another test announcement for this same course.", date: new Date(Date.now()) }
          ]);

          return;
        }

        // Fetch course details
        const response = await fetch(`http://127.0.0.1:8001/courses/${courseId}`);
        const data = await response.json();
        setCourseData(data);

        // Fetch events associated with the course
        const eventsResponse = await fetch(`http://127.0.0.1:8001/courses/${courseId}/events`);
        const eventsData = await eventsResponse.json();
        setEventsData(eventsData);
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    }

    fetchData();
  }, [courseId]);

  if (!courseData) {
    // Set default data if courseData is not available
    setCourseData({
      courseName: 'Introduction to React Development',
      courseDescription: 'Learn the fundamentals of React development and build modern web applications.',
      instructorName: 'Jane Smith',
      teachingAssistants: ['TA1', 'TA2', 'TA3'],
      numberOfStudents: 120,
      backgroundImage: 'https://picsum.photos/1920/1080',
    });

    setEventsData([
      { id: 1, eventName: 'Orientation Session', numberOfAttendees: 50 },
      { id: 2, eventName: 'Hands-on Workshop', numberOfAttendees: 80 },
    ]);

    setAnnouncements([
      { poster: "Ibrahim", message: "This is a test announcement for this course.", date: new Date(Date.now()) },
      { poster: "Ibrahim 2", message: "This is yet another test announcement for this same course.", date: new Date(Date.now()) }
    ]);
  }

  return (
    <>
      <Menu />

      <div className="course-view">
        {courseData && courseData.backgroundImage && (
          <div className="course-header" style={{ backgroundImage: `url(${courseData.backgroundImage})` }}>
            <h2>{courseData.courseName}</h2>
            <p>{courseData.courseDescription}</p>
          </div>
        )}

        <div className="course-details">
          <h3>Course Information</h3>
          <p>Instructor: {courseData ? courseData.instructorName || 'N/A' : 'N/A'}</p>
          <p>Teaching Assistants: {courseData && courseData.teachingAssistants ? courseData.teachingAssistants.join(', ') : 'N/A'}</p>
          <p>Number of Students Enrolled: {courseData ? courseData.numberOfStudents || 'N/A' : 'N/A'}</p>

          {/* Events Section */}
          <h3>Events</h3>
          <ul>
            {eventsData.map((event) => (
              <li key={event.id}>
                <p>Event Name: {event.eventName}</p>
                <p>Attendees: {event.numberOfAttendees}</p>
                {/* Add more details as needed */}
              </li>
            ))}
          </ul>
        </div>

        <div className="course-announcements">
          <h3>Course Announcements</h3>
          { announcements.map((announcement) => (
            <AnnouncementHighlight announcement={announcement} />
          ))}
        </div>
      </div>
    </>
  );
};

export default CourseView;
