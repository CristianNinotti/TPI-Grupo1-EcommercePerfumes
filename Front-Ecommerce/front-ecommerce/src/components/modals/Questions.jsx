import React, { useEffect } from 'react';
import { useAnimatedClose } from '../animations/UseAnimatedClose';

const Questions = ({ isOpen, onClose }) => {
  const { isVisible, isClosing, handleAnimatedClose, playSound } = useAnimatedClose(isOpen, () => {
    onClose(); // Llamamos a onClose después de la animación
  });

  // Reproducir el sonido de cierre cuando se indique
  useEffect(() => {
    if (playSound) {
      const audio = new Audio('/sounds/close-sound.mp3');  // Asegúrate de que la ruta es correcta
      audio.play();
    }
  }, [playSound]);

  if (!isVisible) return null; // No renderiza nada si el modal no es visible

  

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity ${isClosing ? 'opacity-0' : 'opacity-100'}`}
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
    >
      <div
        className={`bg-white p-6 rounded-xl border-2 border-gray-600 max-w-xl w-full shadow-lg overflow-y-auto max-h-[90vh] transition-all transform ${isClosing ? 'scale-95' : 'scale-100'}`}
      >
        <h1 className="text-xl font-bold mb-4 text-black">Preguntas Frecuentes</h1>
        <h2 className="text-xl font-bold mb-4 text-black">Garantía y devoluciones</h2>
        <p className="mb-2 text-black">
          Todos nuestros productos cuentan con garantía. Además, ofrecemos la posibilidad de cambio y devolución, siempre y cuando el producto no haya sido abierto de su caja original y el cliente conserve el comprobante de compra.
        </p>
        <h2 className="text-xl font-bold mb-4 text-black">Productos Originales</h2>
        <p className="mb-2 text-black">
          Nos aseguramos de que todos los productos que ofrecemos sean 100% originales y estén completamente sellados.
        </p>
        <h2 className="text-xl font-bold mb-4 text-black">Envío Gratuito</h2>
        <p className="mb-2 text-black">
          Ofrecemos envío gratuito en compras superiores a los $270,000. ¡Aprovecha esta oferta para recibir tus productos sin costo adicional de envío!
        </p>
        <button
          onClick={handleAnimatedClose}
          className="mt-6 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default Questions;