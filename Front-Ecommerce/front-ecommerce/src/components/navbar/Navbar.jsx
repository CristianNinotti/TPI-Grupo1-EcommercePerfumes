import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="w-48 min-h-screen bg-gray-100 p-4 shadow-lg">
      <ul className="space-y-4">
        <li>
          <Link to="/" className="text-black hover:text-blue-600">Hola</Link>
        </li>
        <li>
          <Link to="/productos" className="text-black hover:text-blue-600">Como</Link>
        </li>
        <li>
          <Link to="/login/minorista" className="text-black hover:text-blue-600">Estas</Link>
        </li>
        <li>
          <Link to="/login/mayorista" className="text-black hover:text-blue-600">???</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
