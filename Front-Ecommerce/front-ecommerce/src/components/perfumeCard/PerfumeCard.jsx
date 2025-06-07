import React, { useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";
import useCart from "../../hooks/useCart";
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import useFavorites from "../../hooks/useFavorites";
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import useTemporaryModal from "../../hooks/useTemporaryModal";

const PerfumeCard = ({
  onClick,
  id,
  volume,
  brand,
  name,
  stock,
  originalPrice,
  discountedPrice,
  discountPercentage,
  installments = { count: 6, perInstallment: '13.613' },
  cftea = 'CFTEA: 0%',
  priceWithoutTax = 'Precio sin Impuestos Nacionales: $ 67.500',
  onAddToCart
}) => {
  const { user } = useContext(AuthContext);
  const { addToCart } = useCart()
  const navigate = useNavigate();
  const { mode } = useTheme();
  const { addFavorite, removeFavorite, isFavorite, userKey } = useFavorites(user);
  const { showModal, Modal } = useTemporaryModal();

  const renderFavoriteIcon = () => {
    const handleClick = () => {
      if (!userKey) {
        showModal("Debes iniciar sesión para agregar favoritos.");
        return;
      }
      if (isFavorite(id)) {
        removeFavorite(id);
      } else {
        addFavorite(id);
      }
    };

    const Icon = isFavorite(id) ? MdFavorite : MdFavoriteBorder;
    const color = isFavorite(id) ? "red" : "gray";
    const label = isFavorite(id) ? "Quitar de favoritos" : "Agregar a favoritos";

    return (
      <Icon
        className="absolute top-4 left-4 cursor-pointer transition-transform hover:scale-110"
        onClick={handleClick}
        size={32}
        color={color}
        aria-label={label}
      />
    );
  };

  return (
    <div
      className={`rounded-xl shadow-md p-6 relative w-full ${
        mode === "dark" ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
      }`}
    >
      <Modal />
      <div className="absolute top-4 right-4 bg-black text-white text-xs font-semibold px-3 py-1 rounded-full">
        -{discountPercentage}%
      </div>

      <div className="flex justify-center">
        <img src={`images/perfumes/${name}.jpg`} alt={`${brand} ${name}`} className="w-32 h-32 object-contain" />
      </div>

      {renderFavoriteIcon()}

      <div className="flex justify-center mt-4">
        <span className="bg-gray-200 text-gray-700 text-xs uppercase font-medium px-2 py-1 rounded-full">
          {volume}
        </span>
      </div>

      <div className="text-center mt-4">
        <h4 className="text-xs text-gray-500 uppercase">{brand}</h4>
        <p className="text-lg font-bold mt-1">{name}</p>

        <p className={`text-sm font-semibold mt-1 ${stock === 0 ? 'text-red-600' : 'text-green-600'}`}>
          Stock: {stock}
        </p>

        <div className="mt-2 flex items-baseline justify-center space-x-2">
          <span className="text-gray-400 line-through">${originalPrice}</span>
          <span className="text-2xl text-black font-bold">${discountedPrice}</span>
        </div>

        <p className="text-sm text-yellow-600 mt-1">
          {installments.count} cuotas de ${installments.perInstallment}
        </p>
        <p className="text-xs text-gray-400 mt-1">{cftea}</p>
        <p className="text-xs text-gray-400">{priceWithoutTax}</p>
        <>
          <button
            className="mt-4 w-full bg-green-400 uppercase text-sm font-semibold py-2 rounded hover:bg-green-600 hover:text-white transition"
            onClick={onAddToCart}
          >
            Agregar al carrito
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onClick(); }}
            className="mt-2 w-full bg-blue-400 uppercase text-sm font-semibold py-2 rounded hover:bg-blue-600 hover:text-white transition"
          >
            Ver detalles
          </button>
        </>
      </div>
    </div>
  );
};

export default PerfumeCard;