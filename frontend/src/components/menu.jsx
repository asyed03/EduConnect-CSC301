import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Menu.css'; // Make sure to create this CSS file

function Menu() {
  const [profilePic, setProfilePic] = useState('');
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch profile picture
    setProfilePic('https://picsum.photos/200/300?grayscale');

    // Fetch notifications
    async function fetchNotifications() {
      const response = await fetch("http://127.0.0.1:8001/notifications");
      console.log("GET: ", res);
  
      if (response.ok) {
        const res = await response.json();
        setNotifications(res.notifications);
      }
      else {
        const mockNotifications = [
          {
            "id": 1,
            "text": "New course available!",
            "timestamp": "2024-02-05T10:30:00Z"
          },
          {
            "id": 2,
            "text": "You have a new message",
            "timestamp": "2024-02-04T15:45:00Z"
          },
          {
            "id": 3,
            "text": "Reminder: Assignment due tomorrow",
            "timestamp": "2024-02-03T09:00:00Z"
          }
        ];
  
        setNotifications(mockNotifications);
      }
    }

    fetchNotifications();
  }, []);

  return (
    <div className="menu">
      <input type="text" className={"search "} placeholder="Search course name..." />

      <div className="icons">
        <Link to="/notifications">
          <svg>{/* Notifications SVG icon */}</svg>
          {Array.isArray(notifications) && notifications.length > 0 && <span>{notifications.length}</span>}

        </Link>

        <Link to="/messages">
          <svg>{/* Messages SVG icon */}</svg>
        </Link>

        <Link to="/profile-settings">
          {profilePic ?
            <img src={profilePic} alt="Profile" /> :
            <svg>{/* Profile SVG icon */}</svg>}
        </Link>
      </div>
    </div>
  );
}

export default Menu;
