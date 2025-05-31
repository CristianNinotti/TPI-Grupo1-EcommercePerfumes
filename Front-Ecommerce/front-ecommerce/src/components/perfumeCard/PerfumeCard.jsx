import React, { useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";  // Ajusta según la estructura real
import useCart from "../../hooks/useCart";
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

const PerfumeCard = ({
  onClick,
  volume,
  brand,
  name,
  originalPrice,
  discountedPrice,
  discountPercentage,
  installments = { count: 6, perInstallment: '13.613' },
  cftea = 'CFTEA: 0%',
  priceWithoutTax = 'Precio sin Impuestos Nacionales: $ 67.500',
  onAddToCart
}) => {
  const { user } = useContext(AuthContext);  // Obtén el usuario desde el contexto
  const { addToCart } = useCart()
  const navigate = useNavigate();
  const { mode } = useTheme();

  return (
    <div
      className={`rounded-xl shadow-md p-6 relative w-full ${
        mode === "dark" ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
      }`}
    >
      <div className="absolute top-4 right-4 bg-black text-white text-xs font-semibold px-3 py-1 rounded-full">
        -{discountPercentage}%
      </div>

      <div className="flex justify-center">
        <img src={`${name}.jpg`} alt={`${brand} ${name}`} className="w-32 h-32 object-contain" />
      </div>

      <div className="flex justify-center mt-4">
        <span className="bg-gray-200 text-gray-700 text-xs uppercase font-medium px-2 py-1 rounded-full">
          {volume}
        </span>
      </div>

      <div className="text-center mt-4">
        <h4 className="text-xs text-gray-500 uppercase">{brand}</h4>
        <p className="text-lg font-bold mt-1">{name}</p>

        <div className="mt-2 flex items-baseline justify-center space-x-2">
          <span className="text-gray-400 line-through">${originalPrice}</span>
          <span className="text-2xl text-black font-bold">${discountedPrice}</span>
        </div>

        <p className="text-sm text-yellow-600 mt-1">
          {installments.count} cuotas de ${installments.perInstallment}
        </p>
        <p className="text-xs text-gray-400 mt-1">{cftea}</p>
        <p className="text-xs text-gray-400">{priceWithoutTax}</p>

        {/* BOTONES según el tipo de usuario */}
        {user?.accountType === 'SuperAdmin' ? (
          <>
            <button
              className="mt-4 w-full bg-blue-400 uppercase text-sm font-semibold py-2 rounded hover:bg-blue-600 hover:text-white transition"
              onClick={() => navigate("/admin?tab=productos")}
            >
              Modificar Producto
            </button>
            <button
              className="mt-2 w-full bg-red-400 uppercase text-sm font-semibold py-2 rounded hover:bg-red-600 hover:text-white transition"
              onClick={() => navigate("/admin?tab=productos")}
            >
              Eliminar Producto
            </button>
          </>
        ) : (
          <>
            <button className="mt-4 w-full bg-green-400 uppercase text-sm font-semibold py-2 rounded hover:bg-green-600 hover:text-white transition" onClick={onAddToCart}>
              Agregar al carrito
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onClick(); }}
              className="mt-2 w-full bg-blue-400 uppercase text-sm font-semibold py-2 rounded hover:bg-blue-600 hover:text-white transition"
            >
              Ver detalles
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PerfumeCard;
