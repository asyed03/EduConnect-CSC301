// CourseHighlight.js
import "../styles/course_highlight.css"
import React from 'react';
function CourseHighlight({ course }) {
  return (
    <div className="course-highlight">
      <img src={course.image} alt={course.title} className="course-image" />
      <div className="course-info">
        <h3>{course.title}</h3>
        <p>{course.noOfStudentsEnrolled} enrolled</p>
      </div>
      <div className="arrow">{'>'}</div>
    </div>
  );
}

export default CourseHighlight;
