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
  const [rating, setRating] = useState(4);

  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (rating > i) {
      stars.push(
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" className="bi bi-star-fill rate-star" viewBox="0 0 16 16" onClick={() => changeRating(i)}>
          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
        </svg>
      )
    }
    else {
      stars.push(
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star rate-star" viewBox="0 0 16 16" onClick={() => changeRating(i)}>
          <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
        </svg>
      );
    }
  }

  async function changeRating(rating) {

    const body = {
      "user_id": sessionStorage.getItem("userid"),
      "rating": rating+1
    };

    const response = await fetch("http://127.0.0.1:8001/groups/rate/" + courseId, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json"
      }
    });

    if (response.ok) {
      setRating(rating+1);
    }
  }

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

        // Fetch rating
        const ratingResponse = await fetch(`http://127.0.0.1:8001/groups/ratings/${courseId}/${sessionStorage.getItem("userid")}`);
        const ratingData = await ratingResponse.json();
        setRating(ratingData["rating"]);
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
          {
            courseData && (
              <>
                <Link to={`/createevent/${courseData.id}`}>
                  <button className="create-btn">New Event</button>
                </Link>
              </>
            )
          }
        </div>

        <div className="course-rating">
          {stars}
        </div>

        <div className="course-announcements">
          {
            courseData && (
              <>
                <h3>Course Announcements</h3>
                <Link to={`/postannouncement/${courseData.id}`}>
                  <button className="create-btn">New</button>
                </Link>
                {announcements.map((announcement, index) => (
                  <AnnouncementHighlight announcement={announcement} key={index} />
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
