import React, { useState } from "react";
import HowToBuy from "../modals/HowToBuy";
import Delivery from "../modals/Delivery";
import Questions from "../modals/Questions";
import Contact from "../modals/Contact";

const Footer = () => {
  const [isHowToBuyOpen, setIsHowToBuyOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isDeliveryOpen, setIsDeliveryOpen] = useState(false);
  const [isQuestionsOpen, setIsQuestionsOpen] = useState(false);

  // Solo abre el modal, el sonido lo maneja el hook
  const openModal = (setState) => {
    setState(true);
  };

  // Solo cierra el modal, el sonido lo maneja el hook
  const closeModal = (setState) => {
    setState(false);
  };

  return (
    <footer className="w-full bg-black text-white p-4">
      <div className="max-w-7xl mx-auto p-4 flex flex-col md:flex-row justify-between gap-8">
        {/* Contacto */}
        <div>
          <h2 className="text-gray-600 font-bold text-lg mb-4">¡Contactanos!</h2>
          <p>Salta 2949<br />Rosario - Santa Fe</p>
          <p className="mt-2">
            Compras mayoristas: <span className="italic">341-2553003</span><br />
            Compras minoristas: <span className="italic">341-2553080</span><br />
            Proveedores: <span className="italic">341-2553084</span><br />
          </p>
        </div>

        {/* Horarios de Atención */}
        <div>
          <h2 className="text-gray-600 font-bold text-lg mb-4 ml-12">Horarios de atención</h2>
          <div className="grid grid-cols-2 gap-8">
            {/* Minorista */}
            <div className="w-40">
              <h3 className="font-semibold">Minorista</h3>
              <p>Lunes a Viernes:<br />9:00 a 20:00 hs</p>
              <p>Sábados:<br />9:00 a 13:00</p>
            </div>

            {/* Mayorista */}
            <div className="w-40">
              <h3 className="font-semibold">Mayorista</h3>
              <p>Lunes:<br />9:00 a 13:30 hs<br /> 15:00 a 17:00 hs</p>
              <p>Martes a Viernes:<br />9:00 a 17:00 hs</p>
              <p>Sábados:<br />9:00 a 13:00</p>
            </div>
          </div>
        </div>

        {/* Sobre el almacén */}
        <div>
          <h2 className="text-gray-600 font-bold text-lg mb-4">Sobre el almacén</h2>
          <ul className="space-y-2">
            <li><p className="hover:text-green-400 cursor-pointer" onClick={() => openModal(setIsQuestionsOpen)}>Preguntas frecuentes</p></li>
            <li><p className="hover:text-green-400 cursor-pointer" onClick={() => openModal(setIsHowToBuyOpen)}>¿Cómo comprar?</p></li>
            <li><p className="hover:text-green-400 cursor-pointer" onClick={() => openModal(setIsDeliveryOpen)}>Plazos de entrega </p></li>
            <li><p className="hover:text-green-400 cursor-pointer" onClick={() => openModal(setIsContactOpen)}>Contáctanos </p></li>
          </ul>
        </div>
      </div>

      {/* Modales */}
      <HowToBuy isOpen={isHowToBuyOpen} onClose={() => closeModal(setIsHowToBuyOpen)} />
      <Delivery isOpen={isDeliveryOpen} onClose={() => closeModal(setIsDeliveryOpen)} />
      <Questions isOpen={isQuestionsOpen} onClose={() => closeModal(setIsQuestionsOpen)} />
      <Contact isOpen={isContactOpen} onClose={() => closeModal(setIsContactOpen)} />
    </footer>
  );
};

export default Footer;