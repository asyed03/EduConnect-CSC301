import { useEffect, useState } from "react";
import "../styles/Dashboard.scss"
import { Link } from "react-router-dom";
import Menu from "../components/menu";
import CourseHighlight from "../components/coursehighlight";
import UpcomingEvents from "../components/upcomingeventhighlight";

function Dashboard() {
  const [activeCourses, setActiveCourses] = useState([]);
  const [activeSearched, setActiveSearched] = useState(null);
  const [allCourses, setAllCourses] = useState([]);
  const [allSearched, setAllSearched] = useState(null);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  async function fetchData() {
    try {
      const coursesResponse = await fetch(`http://127.0.0.1:8001/groups/user/${sessionStorage.getItem("userid")}`);
      const coursesData = await coursesResponse.json();
      
      // Find all other courses
      const allCoursesResponse = await fetch("http://127.0.0.1:8001/groups");
      const allCoursesData = await allCoursesResponse.json();
      
      // Remove overlap
      const tempAll = allCoursesData.filter((course) => {
        for (let c of coursesData) {
          if (c.id == course.id) {
            return false;
          }
        }

        return true;
      });

      setActiveCourses(coursesData);
      setAllCourses(tempAll);

      //setUpcomingEvents(eventsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    // Fetch active courses and upcoming events data
    async function fetchDashboardData() {
      await fetchData();
    }

    fetchDashboardData();
    // Example data
    const egData = {
      "upcomingEvents": [
        {
          "id": 1,
          "title": "301 Office Hours",
          "description": "Join us for a fun and informative meetup about React.",
          "date": "2024-03-01T18:00:00Z",
          "noOfStudentsEnrolled": 15,
          "image": "https://picsum.photos/500"
        },
        {
          "id": 2,
          "title": "309 Office Hours",
          "description": "A hands-on workshop where you'll build a small project using React.",
          "date": "2024-04-01T09:00:00Z",
          "noOfStudentsEnrolled": 10,
          "image": "https://picsum.photos/600"
        },
        {
          "id": 3,
          "title": "311 Group Study",
          "description": "A hands-on workshop where you'll build a small project using React.",
          "date": "2024-04-01T09:00:00Z",
          "noOfStudentsEnrolled": 10,
          "image": "https://picsum.photos/700"
        },
        {
          "id": 4,
          "title": "347 Group Study",
          "description": "A hands-on workshop where you'll build a small project using React.",
          "date": "2024-04-01T09:00:00Z",
          "noOfStudentsEnrolled": 10,
          "image": "https://picsum.photos/200"
        },
        {
          "id": 5,
          "title": "343 Office Hours",
          "description": "A hands-on workshop where you'll build a small project using React.",
          "date": "2024-04-01T09:00:00Z",
          "noOfStudentsEnrolled": 10,
          "image": "https://picsum.photos/800"
        }
      ]
    }

    //setActiveCourses(egData["activeCourses"]);
    setUpcomingEvents(egData["upcomingEvents"]);
  }, []);

  async function joinGroup(course) {
    const body = {
      "userid": sessionStorage.getItem("userid")
    };

    const response = await fetch(`http://127.0.0.1:8001/groups/join/${course.id}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json"
      }
    });

    const res = response.status;
    if (res == 200) {
      fetchData();
    }

    console.log(activeCourses);

    console.log("POST: ", res)
  }

  function handleSearch(e) {
    const text = e.target.value;

    if (text.length < 2) {
      setActiveSearched(null);
      setAllSearched(null);
      return;
    }

    let tempActive = [];
    for (let c of activeCourses) {
      if (c.title.toLowerCase().includes(text.toLowerCase()) || c.description.toLowerCase().includes(text.toLowerCase())) {
        tempActive.push(c);
      }
    }
    
    let tempAll = [];
    for (let c of allCourses) {
      if (c.title.toLowerCase().includes(text.toLowerCase()) || c.description.toLowerCase().includes(text.toLowerCase())) {
        tempAll.push(c);
      }
    }

    setActiveSearched(tempActive);
    setAllSearched(tempAll);
  }

  return (
    <>
      <Menu handleSearch={handleSearch} />

      <div className="dashboard">
        <div className="group-main">
          <Link to="/groupregister">
            <button className="create-btn">Create Course</button>
          </Link>

          {/* Active Courses Section */}
          <div className="active-courses">
            <h2>Active courses</h2>
            <div className="course-block">
              {
                activeSearched != null ?
                  activeSearched.map(course => (
                    <Link to={`/courses/${course.id}`} key={course.id}>
                      <CourseHighlight course={course} />
                    </Link>
                  ))
                  :
                  (
                    activeCourses != null && activeCourses.length > 0 ?
                      activeCourses.map(course => (
                        <Link to={`/courses/${course.id}`} key={course.id}>
                          <CourseHighlight course={course} />
                        </Link>
                      ))
                      :
                      (<h5>You are not registered in any courses.</h5>)
                  )
              }
            </div>
          </div>

          {/* All Courses Section */}
          <div className="active-courses">
            <h2>All courses</h2>
            <div className="course-block">
              {
                allSearched != null ?
                  allSearched.map(course => (
                    <Link to={`/courses/${course.id}`} key={course.id}>
                      <CourseHighlight course={course} />
                    </Link>
                  ))
                  :
                  (
                    allCourses != null && allCourses.length > 0 ?
                      allCourses.map(course => (
                        <a onClick={() => joinGroup(course)} key={course.id}>
                          <CourseHighlight course={course} join={true} />
                        </a>
                      ))
                      :
                      (<h5>There are no courses to display.</h5>)
                  )
              }
            </div>
          </div>
        </div>

        <div className="group-events">
          <Link to="/groupregister">
            <button className="create-btn">Create Event</button>
          </Link>
          {/* Upcoming Events Section */}
          <h2>Upcoming events</h2>
          <div className="upcoming-events">
            {upcomingEvents.map(event => (
              <Link to={`/events/${event.id}`} key={event.id}>
                <UpcomingEvents event={event} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
