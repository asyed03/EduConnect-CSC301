import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Menu.css'; // Make sure to create this CSS file

function Menu() {
  const [profilePic, setProfilePic] = useState('');
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch profile picture
    setProfilePic('https://picsum.photos/200/300?grayscale');
    // axios.get('/api/profile-pic')
    //   .then(response => {
    //     setProfilePic(response.data.url);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     setProfilePic('https://dummyurl.com/dummy.jpg'); // Dummy URL
    //   });

    // Fetch notifications
    axios.get('/api/notifications')
      .then(response => {
        setNotifications(response.data.notifications);
      })
      .catch(error => {
        console.log(error);
        // Use the mock data if the API call fails
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
      });
  }, []);

  return (
    <div className="menu">
      <input type="text" className={"search "}placeholder="Search course name..." />

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
