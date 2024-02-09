import "../styles/AnnouncementHighlight.scss";
import React from "react";

function AnnouncementHighlight({ announcement }) {
  return (
    <div className="announcement">
        <h5>
            {announcement.poster}
        </h5>
        <h6>
            {announcement.date.toString()}
        </h6>
        <p>
            {announcement.message}
        </p>
    </div>
  );
}

export default AnnouncementHighlight;
