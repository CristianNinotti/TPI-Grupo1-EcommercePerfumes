import React, { useState, useEffect, useContext } from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import './home.css';
import CategoryCard from '../categoryCard/categoryCard';
import imagenInicio from '../../assets/image/inicio/maison.jpg';
import { useNavigate } from 'react-router-dom';
import Navbar from '../navbar/Navbar'; // Asegurate de ajustar la ruta si es necesario
import { AuthContext } from '../../context/AuthContext';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const {user} = useContext(AuthContext)
  console.log(user)
  useEffect(() => {
    fetch('https://localhost:7174/api/Category/All%20Categories', {
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
    <div className="flex flex-col min-h-screen">
      <header className="w-full shadow-md">
        <Header />
      </header>

      <section className="hero">
        <img
          src={imagenInicio}
          alt="imagenInicio"
          className="w-full h-48 object-cover"
        />
      </section>

      {/* Contenedor horizontal: Navbar + Main */}
      <div className="flex flex-grow">
        <Navbar />

        <main className="flex-grow bg-white">


          <section className="categories">
            {loading ? (
              <p className="text-center mt-4 text-gray-600">Cargando categorías...</p>
            ) : (
              <ul className="flex flex-wrap justify-around gap-y-6 p-4">
                {categories.map(category => (
                  <li key={category.id}>
                    <CategoryCard
                      categoryId={category.id}
                      categoryName={category.name}
                    />
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="flex justify-center my-10">
            <div className="flex justify-center gap-6">
              <button
                onClick={() => {
                  localStorage.setItem('accountType', 'Minorista');
                  navigate('/login')}
                }
                className="bg-gray-800 text-black uppercase px-6 py-3 font-semibold tracking-wide rounded hover:bg-gray-700 transition"
              >
                Ingreso Minorista
              </button>
              <button
                onClick={() => {
                  localStorage.setItem('accountType', 'Mayorista');
                  navigate('/login')}
                }
                className="bg-gray-800 text-black uppercase px-6 py-3 font-semibold tracking-wide rounded hover:bg-gray-700 transition"
              >
                Ingreso Mayorista
              </button>
            </div>
          </section>

          <section className="hero text-center py-8">
            <p className="text-lg text-gray-800 mb-4">
              Descubre las mejores fragancias para cada ocasión
            </p>
            <button className="bg-black text-gray px-6 py-2 rounded hover:bg-gray-800 transition">
              Explorar ahora
            </button>
          </section>
        </main>
      </div>

      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default Home;
