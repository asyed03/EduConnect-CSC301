
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Register from './routes/register.jsx'
import Index from "./routes/index.jsx";
import Login from "./routes/login.jsx";
import ErrorPage from "./error-page.jsx";
import Dashboard from './routes/dashboard.jsx';
import CourseView from './routes/course-view.jsx';
import GroupRegister from './routes/groupregister.jsx';
import PostAnnouncement from './routes/postannouncement.jsx';
import PostEvent from "./routes/postevent.jsx";

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
    path: "/groupregister",
    element: <GroupRegister />,
    errorElement: <ErrorPage />
  },
  {
    path: '/postannouncement/:courseId',
    element: <PostAnnouncement />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/createevent/:courseId',
    element: <PostEvent />,
    errorElement: <ErrorPage />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
