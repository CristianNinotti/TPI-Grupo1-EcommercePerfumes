import React, { useState, useEffect } from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import "./home.css";
import CategoryCard from '../categoryCard/categoryCard';
import imagenInicio from "../../assets/image/inicio/maison.jpg";

const Home = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://localhost:7174/api/Category/All%20Categories", { // Asegúrate de que la URL sea correcta
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(res => {
                if (!res.ok) throw new Error("Error al traer categorías");
                return res.json();
            })
            .then(data => setCategories(data))
            .catch(err => console.error("Error:", err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <>
            <Header />
            <main>

                <section className="hero">
                    <img src={imagenInicio} alt="imagenInicio" className="w-full h-48 object-cover" />
                </section>

                <section className="categories">
                    {loading ? (
                        <p>Cargando categorías...</p>
                    ) : (
                        <ul className="flex flex-wrap justify-around gap-y-6 p-4 ">
                            {categories.map(category => (
                                <li key={category.id}
                                
                                >
                                    <CategoryCard
                                        categoryId={category.id}
                                        categoryName={category.name}
                                    />
                                </li>
                            ))}
                        </ul>
                    )}
                </section>

                <section className="hero">
                    <p style={{color: 'black'}}>Descubre las mejores fragancias para cada ocasión</p>
                    <button>Explorar ahora</button>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default Home;