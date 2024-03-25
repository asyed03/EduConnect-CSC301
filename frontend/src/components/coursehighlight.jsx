// CourseHighlight.js
import "../styles/CourseHighlight.scss"
import React from 'react';
function CourseHighlight({ course, join }) {
  return (
    <div className="course-highlight">
      <img src={`http://127.0.0.1:8001/${course.picture}`} alt={course.title} className="course-image" />
      <div className="course-info">
        <h3>{course.title}</h3>
        <span>{course.description}</span>
        <p>{course.enrolled} enrolled</p>
      </div>
      { join && ( <p className="join-text">Join</p> )}
      <div className="arrow">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
        </svg>
      </div>
    </div>
  );
}

export default CourseHighlight;
