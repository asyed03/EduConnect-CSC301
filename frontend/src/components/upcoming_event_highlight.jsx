import "../styles/upcoming_event_highlight.css";
import React from "react";
function UpcomingEvents({ event }) {
  return (
    <div className="upcoming-event">
      <div className="icon">
       <img src={event.image} alt={event.title} />
        {/* Insert SVG or image tag for the icon here */}
      </div>
      <div className="info">
        <h3>{event.title}</h3>
        <p>{event.noOfStudentsEnrolled} attending</p>
      </div>
      <button>Join</button>
    </div>
  );
}

export default UpcomingEvents;
