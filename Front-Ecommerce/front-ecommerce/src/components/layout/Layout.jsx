// src/layout/Layout.jsx
import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../header/Header'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'

const Layout = () => (
  <div className="flex flex-col min-h-screen">
    <header className="w-full shadow-md">
      <Header />
    </header>

    <div className="flex flex-grow">

      <main className="flex-grow bg-white p-6">
        <Outlet />
      </main>
    </div>

    <footer className="mt-auto">
      <Footer />
    </footer>
  </div>
)

export default Layout
