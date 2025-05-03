import React from 'react';

const HowToBuy = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl max-w-xl w-full shadow-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-bold mb-4">¿Cómo comprar?</h2>
        <p className="mb-2">
          En la página de “Inicio”, seleccione los artículos que desea comprar y agréguelos al carrito. El carrito le irá mostrando la cantidad de ítems agregados al mismo.
        </p>
        <p className="mb-2">
          Diríjase al <strong>CARRITO</strong>. Allí verá el detalle de su compra. Podrá modificar cantidades y/o eliminar productos.
        </p>
        <p className="mb-2">
          Si está conforme con su pedido presione el botón <strong>CONTINUAR</strong>.
        </p>
        <p className="mb-2">
          Deberá estar registrado como cliente en nuestro sistema. Si ya lo hizo, ingrese con su nombre de usuario (que es su DNI) y contraseña que es <strong>Almacen2018</strong> (con A mayúscula), siempre y cuando usted no la haya modificado.
        </p>
        <p className="mb-2">
          Si no está registrado, podrá hacerlo ingresando sus datos en el formulario “<strong>Deseo Registrarme</strong>”.
        </p>
        <p className="mb-2">
          Solo resta seleccionar la forma de envío, fecha y turno de entrega y para finalizar presione <strong>REALIZAR EL PEDIDO</strong>.
        </p>
        <p>
          Automáticamente le llegará a la casilla de correo proporcionada un comprobante de compra. El Almacén se estará contactando con usted dentro de las próximas horas para coordinar la entrega y el pago del pedido.
        </p>
        <button onClick={onClose} className="mt-6 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default HowToBuy;