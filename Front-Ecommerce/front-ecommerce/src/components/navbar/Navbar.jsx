import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { playOpenSound } from '../sounds/Sounds';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="bg-white w-full p-4 shadow-lg border-b border-gray-200">
      <ul className="flex flex-row space-x-16 justify-center items-center">
        <li>
          <div
            onClick={(e) => {
              e.preventDefault();
              playOpenSound();
              navigate("/products");
            }}
            className={`text-black font-semibold hover:text-green-400 cursor-pointer uppercase tracking-widest ${
              location.pathname === "/products" && !location.search.includes("gender")
                ? "text-green-600"
                : ""
            }`}
          >
            TODAS LAS FRAGANCIAS
          </div>
        </li>
        <li>
          <div
            onClick={(e) => {
              e.preventDefault();
              playOpenSound();
              navigate("/products?gender=femenino");
            }}
            className={`text-black font-semibold hover:text-green-400 cursor-pointer uppercase tracking-widest ${
              location.search.includes("gender=femenino")
                ? "text-green-600"
                : ""
            }`}
          >
            FRAGANCIAS FEMENINAS
          </div>
        </li>
        <li>
          <div
            onClick={(e) => {
              e.preventDefault();
              playOpenSound();
              navigate("/products?gender=masculino");
            }}
            className={`text-black font-semibold hover:text-green-400 cursor-pointer uppercase tracking-widest ${
              location.search.includes("gender=masculino")
                ? "text-green-600"
                : ""
            }`}
          >
            FRAGANCIAS MASCULINAS
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
