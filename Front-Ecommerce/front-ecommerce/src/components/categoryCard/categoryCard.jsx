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
    cursor-pointer select-none transition-colors
  `;

  const availableClasses = isSelected
    ? 'bg-green-600 text-white'
    : mode === 'dark'
      ? 'bg-gray-200 text-black hover:bg-green-400'
      : 'bg-gray-200 hover:bg-green-400';

  const unavailableClasses = 'bg-red-100 text-red-800 opacity-50 cursor-not-allowed';

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
      }`}
    >
      {categoryName}
      {!categoryAvailable && ' (No Disp.)'}
    </span>
  );
};

export default CategoryCard;