import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { playOpenSound, playCloseSound } from '../sounds/Sounds';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showSubmenu, setShowSubmenu] = useState(false);

  return (
    <nav className="bg-white w-full p-4 shadow-lg border-b border-gray-200">
      <ul className="flex flex-row space-x-16 justify-center items-center">
        {/* Sección FRAGANCIAS */}
        <li className="relative">
          <div
            onClick={(e) => {
              e.preventDefault();
              playOpenSound();
              setShowSubmenu((prev) => !prev);
            }}
            className="text-black font-semibold hover:text-green-400 cursor-pointer uppercase tracking-widest"
          >
            FRAGANCIAS
          </div>
          {showSubmenu && (
            <ul className="absolute left-0 mt-2 bg-white shadow-lg rounded z-10">
              <li>
                <p
                  onClick={(e) => {
                    e.preventDefault();
                    playOpenSound();
                    navigate("/products");
                    setShowSubmenu(false);
                  }}
                  className={`cursor-pointer px-4 py-2 uppercase tracking-widest ${
                    location.pathname === "/products"
                      ? "text-green-600"
                      : "text-black hover:text-green-400"
                  }`}
                >
                  Perfumes
                </p>
              </li>
            </ul>
          )}
        </li>
        {/* Sección MAQUILLAJE */}
        <li>
          <div
            onClick={(e) => {
              e.preventDefault();
              playOpenSound();
              navigate("/makeup");
            }}
            className={`text-black font-semibold hover:text-green-400 cursor-pointer uppercase tracking-widest ${
              location.pathname === "/makeup" ? "text-green-600" : ""
            }`}
          >
            MAQUILLAJE
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
