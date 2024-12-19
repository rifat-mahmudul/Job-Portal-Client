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
    element : <Dashboard></Dashboard>,
    children : [
      {
        index : true,
        element : <Statistics></Statistics>
      },
      {
        path : 'add-room',
        element : <AddRoom></AddRoom>
      },
      {
        path : 'my-listings',
        element : <MyListings></MyListings>
      },
      {
        path : 'manage-users',
        element : <ManageUsers></ManageUsers>
      },
    ]
  }
])
