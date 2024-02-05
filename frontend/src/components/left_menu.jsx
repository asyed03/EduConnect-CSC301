import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom if you're using it for navigation
import "../styles/left_menu.css";

const LeftMenu = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleMenu = () => {
  };

  return (
    <div className={`left-menu ${expanded ? "expanded" : ""}`}>
      {/* Hamburger menu */}
      <div className="hamburger-menu" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Dashboard */}
      <Link to="/dashboard" className="menu-item">
        <svg
          className="group-799"
          width="29"
          height="27"
          viewBox="0 0 29 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* ... (Dashboard SVG path) */}
        </svg>
        {expanded && <span>Dashboard</span>}
      </Link>

      {/* Messages */}
      <Link to="/messages" className="menu-item">
        <svg
          className="group-795"
          width="29"
          height="29"
          viewBox="0 0 29 29"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* ... (Messages SVG path) */}
        </svg>
        {expanded && <span>Messages</span>}
      </Link>

      {/* Profile Settings */}
      <Link to="/profile-settings" className="menu-item">
        <svg
          className="group-794"
          width="25"
          height="31"
          viewBox="0 0 25 31"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* ... (Profile Settings SVG path) */}
        </svg>
        {expanded && <span>Profile Settings</span>}
      </Link>

      {/* ... (Other menu items/icons as needed) */}
    </div>
  );
};

export default LeftMenu;
