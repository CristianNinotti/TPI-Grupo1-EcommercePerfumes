import React, { useState, useEffect, useContext } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Home = () => {
  const { auth, user} = useContext(AuthContext)
  const navigate = useNavigate();
  
  return (
    <main className="flex-grow bg-white">
      { !auth.loggedIn && (
      <section className="flex justify-center my-10">
        <div className="flex justify-center gap-6">
          <button
            onClick={() => {
              localStorage.setItem('accountType', 'Minorista');
              navigate('/login')}
            }
            className="bg-gray-800 uppercase px-6 py-3 font-semibold tracking-wide rounded hover:bg-gray-700 transition"
          >
            Ingreso Minorista
          </button>
          <button
            onClick={() => {
              localStorage.setItem('accountType', 'Mayorista');
              navigate('/login')}
            }
            className="bg-gray-800 uppercase px-6 py-3 font-semibold tracking-wide rounded hover:bg-gray-700 transition"
          >
            Ingreso Mayorista
          </button>
        </div>
      </section>
      )}
      <section className="hero text-center py-8">
        <p className="text-lg text-gray-800 mb-4">
          Descubre las mejores fragancias para cada ocasión
        </p>
        <button 
          className="bg-black text-gray px-6 py-2 rounded hover:bg-gray-800 transition"
            onClick={() => {navigate("/products")}}
        >
          Explorar ahora
        </button>
      </section>
    </main>
  );
};

export default Home;
