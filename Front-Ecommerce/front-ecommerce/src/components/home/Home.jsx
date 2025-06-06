import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Categories from '../categories/Categories';
import { useTheme } from '../../context/ThemeContext';

const Home = () => {
  const { auth, user} = useContext(AuthContext)
  const navigate = useNavigate();
  const { mode } = useTheme();
  
  return (
    <main className="flex-grow">
      <section className="p-0 text-center m-10">
        <p className="text-lg mb-4 font-semibold">
          Descubre las mejores fragancias para cada ocasión
        </p>
        <button 
          className={`px-4 py-2 rounded transition font-semibold ${
            mode === "dark"
              ? "bg-gray-700 text-white hover:bg-green-600"
              : "bg-gray-200 text-black hover:bg-green-400"
          }`}
            onClick={() => {navigate("/products")}}
        >
          Ver productos
        </button>
      </section>
      <p className='w-full text-center font-semibold'>Explore nuestras categorías disponibles y encuentre su fragancia ideal</p>
      <Categories />
    </main>
  );
};

export default Home;
