import { createBrowserRouter } from 'react-router-dom';
import { UserDetails } from './components/users/UserDetails';
import App from './App';
import { Users } from './components/users/Users';


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Users searchQuery={''} />
      },
      {
        path: 'users',
        element: <Users searchQuery={''} />
      },
      {
        path: 'users/:id',
        element: <UserDetails />
      },
    ]
  },
]);
