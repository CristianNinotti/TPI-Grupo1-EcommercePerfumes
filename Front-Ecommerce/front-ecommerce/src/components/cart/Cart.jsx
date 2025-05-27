import { useEffect, useState } from "react";
import { initMercadoPago, Payment } from "@mercadopago/sdk-react";
import useCart from "../../hooks/useCart";
import Perfume from "../../assets/image/inicio/aa.webp";

const CheckoutPage = () => {
  const [preferenceId, setPreferenceId] = useState(null);
  const [showBrick, setShowBrick] = useState(false);
  const { cartItems, addToCart, decreaseQuantity, clearCart, removeFromCart } = useCart();

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  useEffect(() => {
    initMercadoPago("TEST-629cd2b0-3587-415b-aac4-f2889e5d9386");
  }, []);

  useEffect(() => {
    setShowBrick(false);
    setPreferenceId(null);
  }, [cartItems]);

  const createPreference = async () => {
    try {
      const items = cartItems.map((item) => ({
        title: item.title,
        quantity: item.quantity,
        unitPrice: item.price,
      }));

      const response = await fetch("https://localhost:7174/api/MercadoPago/create-preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(items),
      });

      const data = await response.json();
      setPreferenceId(data.preferenceId);
      setShowBrick(true);
    } catch (error) {
      console.error("Error creando la preferencia:", error);
    }
  };

  const initialization = {
    amount: totalAmount,
    preferenceId: preferenceId,
  };

  const customization = {
    paymentMethods: {
      mercadoPago: "all",
    },
  };

  const onSubmit = async ({ selectedPaymentMethod, formData }) => {
    return new Promise((resolve, reject) => {
      fetch("/process_payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then(() => resolve())
        .catch(() => reject());
    });
  };

  const onError = async (error) => {
    console.log("Error en el Brick:", error);
  };

  const onReady = async () => {
    console.log("Brick listo");
  };

  // 🛒 Si el carrito está vacío, mostramos solo el mensaje
  if (cartItems.length === 0) {
    return (
      <div className="w-full m-[25px] justify-center">
        <h2 className="text-2xl font-semibold mb-4">Finalizar compra</h2>
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-6 rounded">
          El carrito está vacío.
        </div>
      </div>
    );
  }

  return (
    <div className="w-full m-[25px] justify-center">
      <h2 className="text-2xl font-semibold mb-4">Finalizar compra</h2>

      <div className="flex flex-col md:flex-row gap-8">
        {/* RESUMEN IZQUIERDA */}
        <div className="flex-1 bg-gray-200 rounded-lg shadow p-4">
          <h3 className="text-lg font-bold mb-4">Resumen de productos</h3>
          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-4 mb-4 border-b pb-4">
              <img src={Perfume} alt={item.title} className="w-20 h-20 object-cover rounded" />
              <div className="flex flex-col justify-between flex-grow">
                <div>
                  <h4 className="font-semibold">{item.title}</h4>
                  <p className="text-gray-500 text-sm">{item.description}</p>
                </div>
                <div className="text-sm mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="bg-gray-300 px-2 rounded hover:bg-gray-400"
                    >
                      -
                    </button>
                    <span className="font-bold">{item.quantity}</span>
                    <button
                      onClick={() => addToCart(item, 1)}
                      className="bg-gray-300 px-2 rounded hover:bg-gray-400"
                    >
                      +
                    </button>
                  </div>
                  <div>
                    <p>Precio unitario: ${item.price}</p>
                    <p className="font-bold">
                      Subtotal: ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 ml-4"
                    title="Eliminar del carrito"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* COLUMNA DERECHA */}
        <div className="flex-1 bg-gray-200 rounded-lg shadow p-4 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold mb-4">Pago seguro</h3>
            <div className="text-xl mb-6">
              Total a pagar: <span className="font-bold">${totalAmount.toFixed(2)}</span>
            </div>

            {!showBrick ? (
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
                onClick={createPreference}
              >
                Confirmar pago
              </button>
            ) : (
              <Payment
                initialization={initialization}
                customization={customization}
                onSubmit={onSubmit}
                onReady={onReady}
                onError={onError}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
