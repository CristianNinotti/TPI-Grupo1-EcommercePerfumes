import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Categories from '../categories/Categories';

const Home = () => {
  const { auth, user} = useContext(AuthContext)
  const navigate = useNavigate();
  
  return (
    <main className="flex-grow">
      <section className="p-0 text-center m-10">
        <p className="text-lg mb-4 font-semibold">
          Descubre las mejores fragancias para cada ocasión
        </p>
        <button 
          className="bg-gray-200 px-4 py-2 rounded hover:bg-green-400 transition"
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
