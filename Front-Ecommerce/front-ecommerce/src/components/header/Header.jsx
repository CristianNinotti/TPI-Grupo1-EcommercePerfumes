import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo3 from "../../assets/image/logo/logo3.png";
import { AuthContext } from "../../context/AuthContext";
const Header = () => {

  const { auth } = useContext(AuthContext)
  const navigateTo = (path) => {
  window.location.href = path;  };
  
  return (
    <header className="w-full bg-black text-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo a la izquierda */}
        <img src={logo3} alt="logo3" className="h-35 w-auto object-contain" onClick={() => navigateTo('/')}/>
  
        {/* Navegación a la derecha */}
        <nav>
          <ul className="flex gap-6">
            <li>
              <a
                href="#"
                onClick={() => navigateTo('/')}
                className="text-white hover:text-green-400"
              >
                Inicio
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => navigateTo('/productos')}
                className="text-white hover:text-green-400"
              >
                Productos
              </a>
            </li>
            { auth.loggedIn && (
              <li style={{ marginRight: 20 }}>
                <a
                  href="#"
                  onClick={() => navigateTo('/profile')}
                  className="text-white hover:text-green-400"
                >
                  Perfil
                </a>
              </li>
            )}
            
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
