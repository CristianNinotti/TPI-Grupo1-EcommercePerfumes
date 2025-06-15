import { useState, useEffect } from "react";
import CategoryCard from "../categoryCard/CategoryCard";
import './Categories.css';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shakingIndex, setShakingIndex] = useState(null);

  useEffect(() => {
    fetch('https://localhost:7174/api/Category/AllCategories', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (!res.ok) throw new Error('Error al traer categorías');
        return res.json();
      })
      .then(data => setCategories(data))
      .catch(err => console.error('Error:', err))
      .finally(() => setLoading(false));
  }, []);

  const handleCardClick = (index, categoryId) => {
    setShakingIndex(index); // activa efecto shake
    setTimeout(() => {
      setShakingIndex(null); // lo desactiva
      // luego de que termina el temblor, navegamos
      window.location.href = `/products?categoryId=${categoryId}`;
    }, 500); // coincide con la duración del CSS
  };

  return (
    <section className="categories">
      {loading ? (
        <p className="text-center mt-4 text-gray-600">Cargando categorías...</p>
      ) : (
        <ul className='category-cards'>
          {categories.map((category, index) => (
            <li
              key={category.id}
              className={`category-card bg-gray-200 ${shakingIndex === index ? 'shake' : ''}`}
              style={{ backgroundImage: `url('images/categories/${category.name}.jpg')` }}
            >
              <CategoryCard
                categoryId={category.id}
                categoryName={category.name}
                categoryAvailable={category.available}
                onClick={() => handleCardClick(index, category.id)}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Categories;
