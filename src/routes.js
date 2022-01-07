import { Navigate } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import MainLayout from './components/MainLayout';
import Account from './pages/Account';
import CustomerList from './pages/CustomerList';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import ProductList from './pages/ProductList';
import Register from './pages/Register';
import Settings from './pages/Settings';
import Location from './pages/location';
import Adduserfil from './pages/AddUser';
import Deviceapp from './pages/Device';
import Addcompanypage from './pages/Addorganization';
import Forgetpassword from './components/Forgetpassword/ForgetPassword';
import MovementFlaged from './pages/MovementFlaged';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <Account /> },
      { path: 'employees', element: <CustomerList /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'register', element: <Register /> },
      { path: 'tapped/employees', element: <ProductList /> },
      { path: 'flagged/employees', element: <MovementFlaged /> },
      { path: 'Adduserfil', element: <Adduserfil /> },
      { path: 'settings', element: <Settings /> },
      { path: 'Addcompanypage', element: <Addcompanypage /> },
      { path: 'MovementFlaged', element: <MovementFlaged /> },
      { path: 'Deviceapp', element: <Deviceapp /> },
      { path: 'locations', element: <Location /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '', element: <Login /> },
      { path: 'forgot', element: <Forgetpassword /> },
      { path: '404', element: <NotFound /> },
      { path: '/dashboard', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
