import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Menu.scss';

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
      <input type="text" placeholder="Search course name" />

      <div className="icons">
        <Link to="/notifications">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="gray" class="bi bi-bell" viewBox="0 0 16 16">
            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
          </svg>
          {Array.isArray(notifications) && notifications.length > 0 && <span>{notifications.length}</span>}
        </Link>

        <Link to="/messages">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="gray" class="bi bi-envelope" viewBox="0 0 16 16">
            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
          </svg>
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
