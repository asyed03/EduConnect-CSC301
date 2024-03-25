// CourseHighlight.js
import "../styles/CourseHighlight.scss"
import React, { useState } from 'react';
function CourseHighlight({ course, join }) {
  const [rating, setRating] = useState(0);

  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (course.rating > i) {
      stars.push(
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" className="bi bi-star-fill rate-star" viewBox="0 0 16 16">
          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
        </svg>
      )
    }
    else {
      stars.push(
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star rate-star" viewBox="0 0 16 16">
          <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
        </svg>
      );
    }
  }

  return (
    <div className="course-highlight">
      <img src="https://picsum.photos/200" alt={course.title} className="course-image" />
      <div className="course-info">
        <h3>{course.title}</h3>
        <span>{course.description}</span>
        <p>{course.enrolled} enrolled</p>
        <div className="course-rating">
          <p>Average rating:</p>{stars}
        </div>
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
