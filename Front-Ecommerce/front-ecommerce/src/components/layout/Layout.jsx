import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../header/Header'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import imagenInicio from '../../assets/image/inicio/maison.jpg';


const Layout = () => (
  <div className='flex flex-col min-h-screen'>
    <Header />
    <Navbar /> {/* Mueve la Navbar aquí, debajo del Header */}
    <div className="flex flex-grow">
      <Outlet />
    </div>
    <Footer />
  </div>
)

export default Layout
