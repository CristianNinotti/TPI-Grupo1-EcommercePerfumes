import { useEffect, useState } from "react";
import CategoryCard from "../categoryCard/CategoryCard"
import './Categories.css';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

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
    
    return (
        <section className="categories" >
            {loading ? (
                <p className="text-center mt-4 text-gray-600">Cargando categorías...</p>
            ) : (
                <ul className='category-cards'>
                    {categories.map(category => (
                    <li key={category.id} className='category-card bg-gray-200' style={{backgroundImage: `url('${category.name}.png')`}}>
                        <CategoryCard
                        categoryId={category.id}
                        categoryName={category.name}
                        categoryAvailable={category.available}
                        />
                    </li>
                    ))}
                </ul>
            )}
        </section>
    );
};

export default Categories;