import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { playOpenSound, playCloseSound } from '../sounds/Sounds';

const Navbar = () => {
  const navigate = useNavigate();
  const [showSubmenu, setShowSubmenu] = useState(false);
  const toggleSubmenu = () => {
    setShowSubmenu(prev => !prev);
  };

  return (
    <nav className="w-48 bg-gray-100 p-4 shadow-lg border-r border-gray-300">
      <ul className="space-y-4">
        <li className="pb-2 border-b border-gray-300">
          <p onClick={(e) => {e.preventDefault(); playOpenSound(); navigate("/")}} className="text-black font-bold hover:text-gray-500 cursor-pointer">Inicio</p>
        </li>

        <li className="pb-2 border-b border-gray-300">
          <div
            onClick={(e) => {e.preventDefault(); playOpenSound(); toggleSubmenu()}}
            className="text-black font-bold hover:text-gray-500 cursor-pointer"
          >
            Productos
          </div>
          {showSubmenu && (
            <ul className="mt-2 space-y-2 pl-4">
              <li>
                <p onClick={(e) => {e.preventDefault(); playOpenSound(); navigate("/products")}} className="text-black hover:text-gray-500 cursor-pointer">Perfumes</p>
              </li>
              <li>
                <p onClick={(e) => {e.preventDefault(); playOpenSound(); navigate("/")}} className="text-black hover:text-gray-500 cursor-pointer">Maquillajes</p>
              </li>
            </ul>
          )}
        </li>
          
        <li>
          <p onClick={(e)=> {e.preventDefault(); playOpenSound(); navigate("/categories")}} className="text-black font-bold hover:text-gray-500 cursor-pointer">Categorías</p>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
