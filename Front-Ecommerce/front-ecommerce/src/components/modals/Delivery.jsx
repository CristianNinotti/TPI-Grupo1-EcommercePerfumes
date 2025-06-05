import React from 'react';
import { useAnimatedClose } from '../animations/UseAnimatedClose';

const Delivery = ({ isOpen, onClose }) => {
  const { isVisible, isClosing, handleAnimatedClose } = useAnimatedClose(isOpen, onClose);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity ${isClosing ? 'opacity-0' : 'opacity-100'}`}
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
    >
      <div
        className={`bg-white p-6 rounded-xl border-2 border-gray-600 max-w-xl w-full shadow-lg overflow-y-auto max-h-[90vh] transition-all transform ${isClosing ? 'scale-95' : 'scale-100'}`}
      >
        <h1 className="text-xl font-bold mb-4 text-black">Plazo de entrega</h1>
        <h2 className="text-xl font-bold mb-4 text-black">Productos con retiro en tienda</h2>
        <p className="mb-2 text-black">
          Los productos que elijas para retirar en nuestra tienda estarán disponibles para ser retirados en un plazo de 2 días hábiles a partir de la confirmación de tu pedido.
        </p>
        <h2 className="text-xl font-bold mb-4 text-black">Productos con envío</h2>
        <p className="mb-2 text-black">
          Los productos con envío a domicilio serán entregados en un plazo de 5 días hábiles desde la confirmación del pedido.
        </p>
        <h2 className="text-xl font-bold mb-4 text-black">Recomendación</h2>
        <p className="mb-2 text-black">
          En todos los casos, te recomendamos verificar tu casilla de correo electrónico para recibir el mail de aprobación y el detalle del estado de tu pedido. Asegúrate de revisar tanto tu bandeja de entrada como la carpeta de correos no deseados para evitar cualquier inconveniente.
        </p>
        <button onClick={handleAnimatedClose} className="mt-6 bg-green-400 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default Delivery;