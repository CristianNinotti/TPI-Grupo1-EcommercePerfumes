import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [showSubmenu, setShowSubmenu] = useState(false);

  const toggleSubmenu = () => {
    setShowSubmenu(prev => !prev);
  };

  return (
    <nav className="w-48 min-h-screen bg-gray-100 p-4 shadow-lg border-r border-gray-300">
      <ul className="space-y-4">
        <li className="pb-2 border-b border-gray-300">
          <Link to="/" className="text-black hover:text-blue-600">Inicio</Link>
        </li>

        <li className="pb-2 border-b border-gray-300">
          {/* Componente que actúa como botón, con cursor-pointer */}
          <div
            onClick={toggleSubmenu}
            className="text-black hover:text-blue-600 w-full text-left cursor-pointer"
          >
            Perfumes
          </div>
          {showSubmenu && (
            <ul className="mt-2 space-y-2 pl-4">
              <li>
                <Link to="/productos" className="text-sm text-gray-700 hover:text-blue-600">
                  Hombre
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-gray-700 hover:text-blue-600">
                  Mujer
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-gray-700 hover:text-blue-600">
                  Unisex
                </Link>
              </li>
            </ul>
          )}
        </li>
        
        <li className="pb-2 border-b border-gray-300">
          <Link to="#" className="text-black hover:text-blue-600">Maquillajes</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
