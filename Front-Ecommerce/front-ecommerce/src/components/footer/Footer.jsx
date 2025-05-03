const Footer = () => {
  return (
    <footer className="w-full bg-black text-white p-4 ">
      <div className="max-w-7xl mx-auto p-4 flex flex-col md:flex-row justify-between gap-8">
        {/* Contacto */}
        <div>
          <h2 style={{ color: '#6B7280' }} className="font-bold text-lg mb-4">¡Contactanos!</h2>
          <p>Salta 2949<br />Rosario - Santa Fe</p>
          <p className="mt-2">
            Compras mayoristas: <span class="italic">341-2553003</span><br />
            Compras minoristas: <span class="italic">341-2553080</span><br />
            Proveedores: <span class="italic">341-2553084</span><br />
            
          </p>
          <div className="flex gap-4 mt-4">
            <a href="#" aria-label="Facebook" className="hover:text-green-400">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-green-400">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>

        {/* Horarios de Atención */}
        <div>
          <h2 style={{ color: '#6B7280' }} className="font-bold text-lg mb-4 ml-12">Horarios de atención</h2>
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
          <h2 style={{ color: '#6B7280' }} className="font-bold text-lg mb-4">Sobre el almacén</h2>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-green-400">Preguntas frecuentes</a></li>
            <li><a href="#" className="hover:text-green-400">Cómo comprar</a></li>            
            <li><a href="#" className="hover:text-green-400">Plazos de entrega</a></li>
            <li><a href="#" className="hover:text-green-400">Contactanos</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
