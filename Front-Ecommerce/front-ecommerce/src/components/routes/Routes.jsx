import { Routes, Route } from 'react-router-dom';
import RequireAdmin from '../../admin/RequireAdmin';
import DashboardAdmin from '../dashboardAdmin/DashboardAdmin';
import Layout from '../layout/Layout';        
import Home from '../home/Home';
import Login from '../login/Login';
import Productos from '../productos/Productos';
import Register from '../register/Register';
import PerfilUsuario from '../perfil/PerfilUsuario';
import Cart from '../cart/Cart';
import LoginAdmin from '../login/LoginAdmin';

const RoutesComponent = () => {
  return (
    <Routes>

      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="productos" element={<Productos />} />
        <Route path="profile" element={<PerfilUsuario />} />
        <Route path="cart" element={<Cart />} />
     
      </Route>

      <Route path="login" element={<Login />} />
      <Route path="login-admin" element={<LoginAdmin />} />
      <Route path="registro" element={<Register />} />

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
