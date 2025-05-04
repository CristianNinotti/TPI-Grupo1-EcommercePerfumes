import React, { useEffect } from 'react';
import { useAnimatedClose } from '../animations/UseAnimatedClose';

const HowToBuy = ({ isOpen, onClose }) => {
  const { isVisible, isClosing, handleAnimatedClose, playSound } = useAnimatedClose(isOpen, () => {
    onClose();  // Llamamos a onClose después de la animación
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
        <h2 className="text-xl font-bold mb-4 text-black">¿Cómo comprar?</h2>
        <p className="mb-2 text-black">
          En la página de “Inicio”, seleccione los artículos que desea comprar y agréguelos al carrito. El carrito le irá mostrando la cantidad de ítems agregados al mismo.
        </p>
        <p className="mb-2 text-black">
          Diríjase al <strong>CARRITO</strong>. Allí verá el detalle de su compra. Podrá modificar cantidades y/o eliminar productos.
        </p>
        <p className="mb-2 text-black">
          Si está conforme con su pedido presione el botón <strong>CONTINUAR</strong>.
        </p>
        <p className="mb-2 text-black">
          Deberá estar registrado como cliente en nuestro sistema. Si ya lo hizo, ingrese con su nombre de usuario (que es su DNI) y contraseña que es <strong>Almacen2018</strong> (con A mayúscula), siempre y cuando usted no la haya modificado.
        </p>
        <p className="mb-2 text-black">
          Si no está registrado, podrá hacerlo ingresando sus datos en el formulario “<strong>Deseo Registrarme</strong>”.
        </p>
        <p className="mb-2 text-black">
          Solo resta seleccionar la forma de envío, fecha y turno de entrega y para finalizar presione <strong>REALIZAR EL PEDIDO</strong>.
        </p>
        <p className="text-black">
          Automáticamente le llegará a la casilla de correo proporcionada un comprobante de compra. El Almacén se estará contactando con usted dentro de las próximas horas para coordinar la entrega y el pago del pedido.
        </p>
        <button onClick={handleAnimatedClose} className="mt-6 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default HowToBuy;