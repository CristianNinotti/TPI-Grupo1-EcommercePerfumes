import { Routes, Route } from 'react-router-dom';
import Home from '../home/Home';
import Login from '../login/Login';
import Productos from '../productos/Productos';
import Register from '../register/Register';
import PerfilUsuario from '../perfil/PerfilUsuario';
import Cart from '../cart/Cart'



const RoutesComponent = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/profile" element={<PerfilUsuario />} />
        <Route path="cart" element={<Cart />} />

    </Routes>
  )
}

export default RoutesComponent