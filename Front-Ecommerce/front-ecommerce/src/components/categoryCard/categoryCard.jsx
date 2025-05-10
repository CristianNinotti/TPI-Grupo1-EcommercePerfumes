import { useNavigate } from "react-router-dom";

const CategoryCard = ({
  categoryName,
  categoryAvailable,
  isSelected
}) => {
  const navigate = useNavigate();

  const baseClasses = `
    inline-block px-3 py-1 rounded-full text-sm font-medium
    cursor-pointer select-none transition-colors 
  `;

  const availableClasses = isSelected
    ? 'bg-green-600 text-white'
    : 'bg-gray-100 text-gray-800 hover:bg-gray-200';

  const unavailableClasses = 'bg-red-100 text-red-800 opacity-50 cursor-not-allowed';

  const handleClick = () => {
    if (categoryAvailable) {
      navigate('/products', { state: { selectedCategoryName: categoryName } });
    }
  };

  return (
    <span
      onClick={handleClick}
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


