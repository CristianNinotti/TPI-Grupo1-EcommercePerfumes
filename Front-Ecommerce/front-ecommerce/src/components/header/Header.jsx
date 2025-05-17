import { useContext } from "react";
import logo3 from "../../assets/image/logo/logo3.png";
import { AuthContext } from "../../context/AuthContext";
import { playOpenSound } from '../sounds/Sounds';
import { useNavigate, useLocation } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../../hooks/useCart";

const Header = () => {
  const { auth, user } = useContext(AuthContext)
  const { cartItems, totalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="w-auto bg-black text-white">
      <div className="flex justify-around gap-10 items-center">
        {/* Logo a la izquierda */}
        <img
          src={logo3}
          alt="logo3"
          className="h-35 object-contain cursor-pointer transition-transform duration-200 hover:scale-110"
          onClick={(e) => { e.preventDefault(); playOpenSound(); navigate('/') }}
        />


        <nav>
          <ul className="flex gap-6">
            {auth.loggedIn && (
              <li style={{ marginRight: 20 }}>
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); playOpenSound(); navigate("/profile") }}
                  className={`font-semibold ${location.pathname === "/profile" ? "text-green-600" : "text-white hover:text-green-400"}`}
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
                  className="text-white hover:text-green-400 font-semibold"
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
                  className="text-white hover:text-green-400 font-semibold"
                >
                  Registrarse
                </a>
              </li>
            )}

            {auth.loggedIn && user?.accountType === "SuperAdmin" && (
              <li>
                <a
                  href="/admin"
                  onClick={e => { e.preventDefault(); playOpenSound(); setTimeout(() => navigate('/admin'), 200); }}
                  className={`font-semibold ${location.pathname === "/admin" ? "text-green-600" : "text-white hover:text-green-400"}`}
                >
                  Admin
                </a>
              </li>
            )}
            
            <li className="relative mr-5">
              <button
                onClick={() => {
                  playOpenSound();
                  navigate("/cart");
                }}
                style={{ backgroundColor: 'transparent' }}
                className="relative"
              >
                <FaShoppingCart className={`${location.pathname === "/cart" ? "text-green-600" : "text-white hover:text-green-400"} w-6 h-6 transition`} />
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