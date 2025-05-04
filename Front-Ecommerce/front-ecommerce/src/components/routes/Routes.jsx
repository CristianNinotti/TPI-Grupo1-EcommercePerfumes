import { Routes, Route } from 'react-router-dom';
import Home from '../home/Home';
import Login from '../login/Login';
import Productos from '../productos/Productos';
import Register from '../register/Register';
import PerfilUsuario from '../perfil/PerfilUsuario';


const RoutesComponent = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/profile" element={<PerfilUsuario />} />

    </Routes>
  )
}

export default RoutesComponent