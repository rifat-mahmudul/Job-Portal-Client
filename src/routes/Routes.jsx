import { createBrowserRouter } from 'react-router-dom'
import Main from '../layouts/Main'
import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
import RoomDetails from '../pages/RoomDetails/RoomDetails'
import PrivateRoute from './PrivateRoute'
import Dashboard from '../layouts/Dashboard'
import Statistics from '../components/Dashboard/Common/Statistics'
import AddRoom from '../components/Dashboard/Host/AddRoom'
import MyListings from '../components/Dashboard/Host/MyListings'
import ManageUsers from '../components/Dashboard/Admin/ManageUsers'
import Profile from '../components/Dashboard/Common/Profile'
import AdminRoute from './AdminRoute'
import HostRoute from './HostRoute'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/room/:id',
        element: <PrivateRoute><RoomDetails /></PrivateRoute>,
      },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },

  {
    path : '/dashboard',
    element : <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children : [
      {
        index : true,
        element : <PrivateRoute><Statistics></Statistics></PrivateRoute>
      },
      {
        path : 'add-room',
        element : <PrivateRoute><HostRoute><AddRoom></AddRoom></HostRoute></PrivateRoute>
      },
      {
        path : 'my-listings',
        element : <PrivateRoute><HostRoute><MyListings></MyListings></HostRoute></PrivateRoute>
      },
      {
        path : 'manage-users',
        element : <PrivateRoute><AdminRoute><ManageUsers></ManageUsers></AdminRoute></PrivateRoute>
      },
      {
        path : '/dashboard/profile',
        element : <PrivateRoute><Profile></Profile></PrivateRoute>
      },
    ]
  }
])
