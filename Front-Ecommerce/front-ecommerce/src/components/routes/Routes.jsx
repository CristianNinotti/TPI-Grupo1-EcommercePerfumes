import { Routes, Route } from 'react-router-dom';
import Home from '../home/Home';
import Login from '../login/Login';
import Productos from '../productos/Productos';
import Cart from '../cart/Cart'


const RoutesComponent = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="productos" element={<Productos />} />
        <Route path="cart" element={<Cart />} />
    </Routes>
  )
}

export default RoutesComponent