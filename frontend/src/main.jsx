import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Index from './routes/index.jsx';
import Login from './routes/login.jsx';
import {Dashboard } from './routes/dashboard.jsx'; // Corrected import
import Dashboard2 from './routes/dashboard2.jsx'; // Corrected import
import ErrorPage from './error-page.jsx';
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
    path: '/dashboard2',
    element: <Dashboard2 />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/course/:courseId', // Assuming you want to pass courseId as a parameter
    element: <CourseView />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
