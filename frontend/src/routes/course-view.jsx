// CourseView.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Menu from '../components/menu';
import '../styles/CourseView.scss';
import AnnouncementHighlight from '../components/announcementhighlight';

const CourseView = () => {
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch course details
        const response = await fetch(`http://127.0.0.1:8001/groups/${courseId}`);
        const data = await response.json();
        setCourseData(data);

        // Fetch announcements
        const announceResponse = await fetch(`http://127.0.0.1:8001/announcements/${courseId}`);
        const announceData = await announceResponse.json();
        setAnnouncements(announceData);
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    }

    fetchData();
  }, [courseId]);

  return (
    <>
      <Menu />

      <div className="course-view">
        {courseData && courseData.banner && (
          <div className="course-header" style={{ backgroundImage: `url(${courseData.banner})` }}>
            <h2>{courseData.title}</h2>
            <p>{courseData.description}</p>
          </div>
        )}

        <div className="course-details">
          <h3>Course Information</h3>
          <p>Instructor email: {courseData ? courseData.instructor || 'N/A' : 'N/A'}</p>
          <p>Number of Students Enrolled: {courseData ? courseData.enrolled || 'N/A' : 'N/A'}</p>
        </div>

        <div className="course-announcements">
          {
            courseData && (
              <>
                <h3>Course Announcements</h3>
                <Link to={`/postannouncement/${courseData.id}`}>
                  <button className="create-btn">New</button>
                </Link>
                { announcements.map((announcement) => (
                  <AnnouncementHighlight announcement={announcement} />
                ))}
              </>
            )
          }
        </div>
      </div>
    </>
  );
};

export default CourseView;
