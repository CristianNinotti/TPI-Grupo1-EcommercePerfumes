import { Routes, Route } from 'react-router-dom';
import RequireAdmin from '../../requires/RequireAdmin';
import DashboardAdmin from '../dashboardAdmin/DashboardAdmin';
import Layout from '../layout/Layout';        
import Home from '../home/Home';
import Login from '../login/Login';
import Products from '../products/Products';
import Register from '../register/Register';
import Profile from '../profile/Profile';
import Cart from '../cart/Cart';
import LoginAdmin from '../login/LoginAdmin';
import Categories from '../categories/Categories';
import RequireLogged from '../../requires/RequireLogged';
import AccessDenied from '../accesDenied/AccesDenied';  

const RoutesComponent = () => {
  return (
    <Routes>

      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="categories" element={<Categories />} />
        <Route 
          path="profile" 
          element={
            <RequireLogged>
              <Profile /> 
            </RequireLogged>
          }
        />
      </Route>
      <Route path="cart" element={<Cart />} />

      <Route path="login" element={<Login />} />
      <Route path="login-admin" element={<LoginAdmin />} />
      <Route path="registro" element={<Register />} />
      <Route path="AccessDenied" element={<AccessDenied />} />

      <Route
        path="admin/*"
        element={
          <RequireAdmin>
            <DashboardAdmin />
          </RequireAdmin>
        }
      />
    </Routes>
  );
};

export default RoutesComponent;
