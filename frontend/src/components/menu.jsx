import React from "react";
import "../styles/menu.css";
import { useNavigate } from "react-router-dom";

const Menu = ({ className, ...props }) => {
  const navigate = useNavigate();

  const handleSearchClick = () => {
    // Implement logic to navigate to the search page
    console.log("Navigate to search page");
    navigate("/search"); // Replace "/search" with the actual path to your search page
  };

  const handleBellClick = () => {
    // Implement logic to navigate to the announcements page
    console.log("Navigate to announcements page");
    navigate("/announcements"); // Replace "/announcements" with the actual path to your announcements page
  };

  const handleMailClick = () => {
    // Implement logic to navigate to the messages page
    console.log("Navigate to messages page");
    navigate("/messages"); // Replace "/messages" with the actual path to your messages page
  };

  const handleProfileClick = () => {
    // Implement logic to navigate to the profile page
    console.log("Navigate to profile page");
    navigate("/profile"); // Replace "/profile" with the actual path to your profile page
  };

  return (
    <div className={"menu " + className}>
      {/* Search */}
      <div className="search" onClick={handleSearchClick}>
        <svg
          className="group"
          width="480"
          height="48"
          viewBox="0 0 480 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* ... (Your search SVG path) */}
        </svg>
        <div className="search-course-name">Search course name </div>
        <div className="_2089805"></div>
      </div>

      {/* Bell */}
      <svg
        className="icon-awesome-bell"
        width="22"
        height="26"
        viewBox="0 0 22 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={handleBellClick}
      >
        <path
          d="M10.964 25.53C11.3757 25.5305 11.7834 25.4499 12.1638 25.2927C12.5443 25.1356 12.89 24.9049 13.1813 24.6141C13.4726 24.3232 13.7036 23.9777 13.8613 23.5975C14.0189 23.2172 14.1 22.8096 14.1 22.398H7.83305C7.83305 23.2285 8.16289 24.025 8.75004 24.6123C9.33718 25.1996 10.1336 25.5297 10.964 25.53ZM21.507 18.202C20.5611 17.186 18.792 15.657 18.792 10.65C18.7934 8.85362 18.169 7.11289 17.0263 5.72688C15.8835 4.34087 14.2937 3.39613 12.53 3.05498V2.03498C12.53 1.8294 12.4896 1.62583 12.4109 1.43589C12.3322 1.24596 12.2169 1.07338 12.0715 0.928007C11.9262 0.782637 11.7536 0.667323 11.5636 0.588649C11.3737 0.509975 11.1701 0.469482 10.9646 0.469482C10.759 0.469482 10.5554 0.509975 10.3655 0.588649C10.1755 0.667323 10.0029 0.782637 9.85757 0.928007C9.7122 1.07338 9.59689 1.24596 9.51822 1.43589C9.43954 1.62583 9.39905 1.8294 9.39905 2.03498V3.05498C7.63538 3.39613 6.04559 4.34087 4.90284 5.72688C3.76009 7.11289 3.13573 8.85362 3.13705 10.65C3.13705 15.657 1.36805 17.186 0.422049 18.202C0.148203 18.4894 -0.00313098 18.872 4.91229e-05 19.269C0.000311497 19.475 0.0411621 19.6789 0.120267 19.8691C0.199371 20.0593 0.315179 20.2321 0.461073 20.3775C0.606967 20.5229 0.780087 20.6382 0.970542 20.7167C1.161 20.7952 1.36505 20.8354 1.57105 20.835H20.357C20.5632 20.8356 20.7674 20.7956 20.958 20.7172C21.1486 20.6388 21.3219 20.5236 21.468 20.3781C21.614 20.2327 21.7299 20.0598 21.809 19.8695C21.8881 19.6792 21.9289 19.4751 21.9291 19.269C21.9316 18.8735 21.7807 18.4925 21.508 18.206L21.507 18.202Z"
          fill="#767672"
        />
      </svg>

      {/* Mail */}
      <svg
        className="icon-material-email"
        width="25"
        height="20"
        viewBox="0 0 25 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={handleMailClick}
      >
        <path
          d="M21.6999 0.42099H2.54295C1.90959 0.423373 1.30303 0.676849 0.856305 1.12583C0.409577 1.5748 0.15915 2.18263 0.159949 2.81599L0.147949 17.184C0.14927 17.8188 0.402024 18.4272 0.850888 18.8761C1.29975 19.3249 1.90816 19.5777 2.54295 19.579H21.6999C22.3347 19.5777 22.9431 19.3249 23.392 18.8761C23.8409 18.4272 24.0936 17.8188 24.0949 17.184V2.81599C24.0936 2.1812 23.8409 1.57279 23.392 1.12393C22.9431 0.675065 22.3347 0.422311 21.6999 0.42099ZM21.6999 5.20999L12.1209 11.197L2.54295 5.20999V2.81599L12.1219 8.80299L21.7009 2.81599L21.6999 5.20999Z"
          fill="#767672"
        />
      </svg>

      {/* Profile */}
      <div className="ellipse-170" onClick={handleProfileClick}>
        <svg
          width="9"
          height="8"
          viewBox="0 0 9 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.21387 8C6.42301 8 8.21387 6.20914 8.21387 4C8.21387 1.79086 6.42301 0 4.21387 0C2.00473 0 0.213867 1.79086 0.213867 4C0.213867 6.20914 2.00473 8 4.21387 8Z"
            fill="url(#paint0_linear_9_550)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_9_550"
              x1="4.21387"
              y1="0"
              x2="4.21387"
              y2="8"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#13DE82" />
              <stop offset="1" stopColor="#0AB68B" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* ... (Other SVGs and components as needed) */}
    </div>
  );
};

export default Menu;
