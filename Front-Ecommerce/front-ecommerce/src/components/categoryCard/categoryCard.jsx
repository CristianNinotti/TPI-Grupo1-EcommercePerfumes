import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const CategoryCard = ({
  categoryId,
  categoryName,
  categoryAvailable,
  isSelected,
  onClick,
}) => {
  const navigate = useNavigate();
  const { mode } = useTheme();  

  const baseClasses = `
    inline-block px-3 py-1 rounded-full text-sm font-medium
    select-none transition-colors
  `;

  const availableClasses = isSelected
    ? 'cursor-pointer bg-green-600 text-white'
    : mode === 'dark'
      ? 'cursor-pointer bg-gray-200 text-black hover:bg-green-400'
      : 'cursor-pointer bg-gray-200 hover:bg-green-400';

  const unavailableClasses = 'bg-red-400 cursor-not-allowed';

  const handleClick = () => {
    if (categoryAvailable) {
      navigate(`/products?categoryId=${categoryId}`);
    }
  };

  return (
    <span
      onClick={categoryAvailable ? (onClick ? onClick : handleClick) : undefined}
      className={`${baseClasses} ${
        categoryAvailable ? availableClasses : unavailableClasses
      } hover:scale-105 hover:shadow-2xl hover:bg-green-300 hover:opacity-90 transition-all duration-200`}
    >
      {categoryName}
      {!categoryAvailable && ' (No Disp.)'}
    </span>
  );
};

export default CategoryCard;