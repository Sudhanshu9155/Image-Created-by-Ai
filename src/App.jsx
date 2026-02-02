import React from 'react'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router'
import RootLayout from './layout/RootLayout';
import AuthLayout from './layout/AuthLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,  //path will be same as parent path '/' 
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: 'about',
        element: <div>About Us</div>
      },
      {
        path: 'auth',
        element: <AuthLayout />,
        children: [
          {
            path: 'login',
            element: <Login />,
            children: [
              {
                path: "*"
              }
            ]
          },
          {
            path: 'register',
            element: <Register />,
            children: [
              {
                path: "*"
              }
            ]
          },
          {
            path: 'profile',
            element: (
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            ),
            children: [
              {
                path: 'security',
              }
            ]
          },
        ],
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App
