
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Announcements from "./routes/announcements.jsx";
import Register from './routes/register.jsx'
import Index from "./routes/index.jsx";
import Login from "./routes/login.jsx";
import ErrorPage from "./error-page.jsx";
import Dashboard from './routes/dashboard.jsx'; // Corrected import
import CourseView from './routes/course-view.jsx'; // Import CourseView



const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/courses/:courseId', 
    element: <CourseView />,
    errorElement: <ErrorPage />,
  },

  {
    path: "/register",
    element: <Register />,
    errorElement: <ErrorPage />
  },
  {
    path: "/announcements",
    element: <Announcements />,
    errorElement: <ErrorPage />
  }

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />

  </React.StrictMode>

);
