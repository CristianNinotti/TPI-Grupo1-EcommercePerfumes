import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // <-- agrega useLocation
import { playOpenSound, playCloseSound } from '../sounds/Sounds';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // <-- obtiene la ruta actual
  const [showSubmenu, setShowSubmenu] = useState(false);
  const toggleSubmenu = () => {
    setShowSubmenu(prev => !prev);
  };

  return (
    <nav className="bg-white w-48 p-4 shadow-lg border-r border-white">
      <ul className="space-y-4 sticky top-0 h-min pt-3">
        <li className="pb-2 border-b border-black">
          <p onClick={(e) => {e.preventDefault(); playOpenSound(); navigate("/")}} className={`font-semibold cursor-pointer ${
            location.pathname === "/"
              ? "text-green-600"
              : "text-black hover:text-green-400"
            }`}>
            Inicio
          </p>
        </li>

        <li className="pb-2 border-b border-black">
          <div
            onClick={(e) => {e.preventDefault(); playOpenSound(); toggleSubmenu()}}
            className="text-black font-semibold hover:text-green-400 cursor-pointer"
          >
            Productos
          </div>
          {showSubmenu && (
            <ul className="mt-2 space-y-2 pl-4">
              <li>
                <p onClick={(e) => {e.preventDefault(); playOpenSound(); navigate("/products")}} className={`cursor-pointer ${
                  location.pathname === "/products"
                    ? "text-green-600"
                    : "text-black hover:text-green-400"
                  }`}>
                  Perfumes
                </p>
              </li>
              <li>
                <p onClick={(e) => {e.preventDefault(); playOpenSound(); navigate("/makeup")}} className={`cursor-pointer ${
                  location.pathname === "/makeup"
                    ? "text-green-600"
                    : "text-black hover:text-green-400"
                  }`}>
                  Maquillajes
                </p>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
