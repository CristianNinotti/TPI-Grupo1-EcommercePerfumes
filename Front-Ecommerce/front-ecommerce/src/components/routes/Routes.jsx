import { Routes, Route } from 'react-router-dom';
import DashboardAdmin from '../dashboardAdmin/DashboardAdmin';
import Layout from '../layout/Layout';        
import Home from '../home/Home';
import Login from '../login/Login';
import Products from '../products/Products';
import Register from '../register/Register';
import Profile from '../profile/Profile';
import Cart from '../cart/Cart';
import AccessDenied from '../accessDenied/AccessDenied';  
import ProductDetail from '../productDetail/ProductDetail';
import ProtectedRoute from '../../requires/ProtectedRoute';
import ResetPassword from '../resetpassword/Resetpassword';
import ForgotPassword from '../forgotpassword/Forgotpassword';


const RoutesComponent = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="cart" element={<Cart />} />
        <Route
          path="profile"
          element={
            <ProtectedRoute accountType={["Minorista", "Mayorista", "SuperAdmin"]}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
        path="admin/*"
        element={
          <ProtectedRoute accountType={["SuperAdmin"]}>
            <DashboardAdmin />
          </ProtectedRoute>
        }
      />
      </Route>

      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="AccessDenied" element={<AccessDenied />} />
      <Route path="reset-password" element={<ResetPassword />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
};

export default RoutesComponent;
