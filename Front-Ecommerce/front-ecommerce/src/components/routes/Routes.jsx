import { Routes, Route } from 'react-router-dom';
import Home from '../home/Home';
import Login from '../login/Login';
import Productos from '../productos/Productos';


const RoutesComponent = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="productos" element={<Productos />} />
    </Routes>
  )
}

export default RoutesComponent