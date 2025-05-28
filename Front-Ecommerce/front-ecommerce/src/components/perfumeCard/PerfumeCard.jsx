import React, { useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";  // Ajusta según la estructura real
import useCart from "../../hooks/useCart";
import { useNavigate } from 'react-router-dom';

const PerfumeCard = ({
  id,
  onClick,
  image,
  volume = '100 ML',
  brand = 'CALVIN KLEIN',
  name = 'CK ONE GOLD',
  originalPrice = '163.250',
  discountedPrice = '81.675',
  discountPercentage = 50,
  installments = { count: 6, perInstallment: '13.613' },
  cftea = 'CFTEA: 0%',
  priceWithoutTax = 'Precio sin Impuestos Nacionales: $ 67.500',
  onAddToCart
}) => {
  const { user } = useContext(AuthContext);  // Obtén el usuario desde el contexto
  const { addToCart } = useCart()
  const navigate = useNavigate();

  return (
    <div className="bg-gray-200 rounded-xl shadow-md p-6 relative w-full">

      <button className="absolute top-4 left-4 text-gray-400 hover:text-red-500 transition">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.41 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </button>

      <div className="absolute top-4 right-4 bg-black text-white text-xs font-semibold px-3 py-1 rounded-full">
        -{discountPercentage}%
      </div>

      <div className="flex justify-center">
        <img src={image} alt={`${brand} ${name}`} className="w-32 h-32 object-contain" />
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
