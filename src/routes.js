import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import Settings from './pages/Settings';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import FitnessBuddy from './pages/FitnessBuddy';
import DashboardAppPage from './pages/DashboardAppPage';
import AboutUs from './pages/AboutUs';
import SupportUs from './pages/SupportUs';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'account', element: <UserPage /> },
        { path: 'fitness-buddy', element: <FitnessBuddy /> },
        { path: 'blog', element: <Settings /> },
        { path: 'support', element: <SupportUs /> },
        { path: 'about', element: <AboutUs /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
