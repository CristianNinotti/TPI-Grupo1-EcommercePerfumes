import React, { useContext } from "react";
import logo3 from "../../assets/image/logo/logo3.png";
import { AuthContext } from "../../context/AuthContext";
import { playOpenSound, playCloseSound } from '../sounds/Sounds';
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../../hooks/useCart";

const Header = () => {

  const { auth, user } = useContext(AuthContext)
  const { cartItems, totalItems } = useCart();
  const navigate = useNavigate();

  return (
    <header className="w-full bg-black text-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo a la izquierda */}
        <img src={logo3} alt="logo3" className="h-35 w-auto object-contain cursor-pointer" onClick={(e) => { e.preventDefault(); playOpenSound(); navigate('/') }} />


        <nav>
          <ul className="flex gap-6">
            {/*
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();      // Evita que el navegador navegue inmediatamente
                  playOpenSound();         // Reproduce el sonido
                  setTimeout(() => {
                    navigate('/');
                  }, 200);                 // Espera 300ms antes de navegar
                }}
                className="text-white"
              >
                Inicio
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();      // Evita que el navegador navegue inmediatamente
                  playOpenSound();         // Reproduce el sonido
                  setTimeout(() => {
                    navigate('/products');
                  }, 200);                 // Espera 300ms antes de navegar
                }}
                className="text-white hover:text-green-400"
              >
                Productos
              </a>
            </li>

            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();      // Evita que el navegador navegue inmediatamente
                  playOpenSound();         // Reproduce el sonido
                  setTimeout(() => {
                    navigate('/categories');
                  }, 200);                 // Espera 300ms antes de navegar
                }}
                className="text-white hover:text-green-400"
              >
                Categorías
              </a>
            </li>
          */}
          
            {auth.loggedIn && (
              <li style={{ marginRight: 20 }}>
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); playOpenSound(); navigate("/profile") }}
                  className="text-white hover:text-green-400"
                >
                  Perfil
                </a>
              </li>
            )}

            {!auth.loggedIn && (
              <li style={{ marginRight: 20 }}>
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); playOpenSound(); navigate("/login") }}
                  className="text-white hover:text-green-400"
                >
                  Ingresar
                </a>
              </li>
            )}

            {!auth.loggedIn && (
              <li style={{ marginRight: 20 }}>
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); playOpenSound(); navigate("/register") }}
                  className="text-white hover:text-green-400"
                >
                  Registrarse
                </a>
              </li>
            )}

            {/*
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();      // Evita que el navegador navegue inmediatamente
                  playOpenSound();         // Reproduce el sonido
                  setTimeout(() => {
                    navigate('/cart');
                  }, 200);                 // Espera 300ms antes de navegar
                }}
                className="text-white hover:text-green-400"
              >
                Carrito
              </a>
            </li>
            */}

            {auth.loggedIn && user?.accountType === "SuperAdmin" && (
              <li>
                <a
                  href="/admin"
                  onClick={e => { e.preventDefault(); playOpenSound(); setTimeout(() => navigate('/admin'), 200); }}
                  className="text-yellow-300 hover:text-yellow-500 font-semibold"
                >
                  Admin
                </a>
              </li>
            )}
            
            <li className="relative">
              <button
                onClick={() => {
                  playOpenSound();
                  navigate("/cart");
                }}
                style={{ backgroundColor: 'transparent' }}
                className="relative"
              >
                <FaShoppingCart className="text-white w-6 h-6 transition" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;