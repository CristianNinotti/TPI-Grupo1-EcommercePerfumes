import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Categories from '../categories/Categories';
import { useTheme } from '../../context/ThemeContext';
import { CgDisplayFullwidth } from 'react-icons/cg';

const Home = () => {
  const { auth, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { mode } = useTheme();

  return (
    <main className="flex-grow">
      <section className="p-0 text-center m-10">
        {/* Video más ancho y bajo, difuminado bien marcado en los bordes */}
        <div className="flex justify-center my-6">
          <video
            src="/videos/videoPerfume.mp4"
            loop
            muted
            autoPlay
            className="object-cover shadow-[0_0_40px_10px_rgba(0,0,0,0.7)]"
            style={{ width: "100%", height: '30vh' }}
          >
            Tu navegador no soporta el video.
          </video>
        </div>
      </section>
      <p className="w-full text-center font-semibold">
        Explore nuestras categorías disponibles y encuentre su fragancia ideal
      </p>
      <Categories />
    </main>
  );
};

export default Home;
