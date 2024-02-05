import { useState } from "react";
import "../styles/Announcements.scss";

function Announcements() {
  return (
    <>
      <div className="announcements-main">
        <div className="announcement">
          <h2>Announcement 1</h2>
          <p> A1 is due friday! </p>
        </div>
        <div className="announcement">
          <h2>Announcement 2</h2>
          <p> A2 extended until next Monday! </p>
        </div>
        <div className="announcement">
          <h2>Announcement 3</h2>
          <p> Lecture 5 slides posted </p>
        </div>
      </div>
    </>
  );
}

export default Announcements;
