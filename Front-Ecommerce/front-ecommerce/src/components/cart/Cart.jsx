import React, { useEffect, useState } from "react";
import { initMercadoPago, Payment } from "@mercadopago/sdk-react";
import useCart from "../../hooks/useCart";
import CartHeader from "../cartHeader/cartHeader"; 

const CheckoutPage = () => {
  const [preferenceId, setPreferenceId] = useState(null);
  const { cartItems } = useCart()

  useEffect(() => {
    // Inicializa MercadoPago con tu PUBLIC KEY
    initMercadoPago("TEST-629cd2b0-3587-415b-aac4-f2889e5d9386");

    // Crea la preferencia llamando al backend
    const createPreference = async () => {
      try {
        const response = await fetch("https://localhost:7174/api/MercadoPago/create-preference", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: "Mi producto",
            quantity: 1,
            unitPrice: 10.50,
          }),
        });

        const data = await response.json();
        setPreferenceId(data.preferenceId);
      } catch (error) {
        console.error("Error creando la preferencia:", error);
      }
    };

    createPreference();
  }, []);

  const initialization = {
    amount: 10.50, // formas de usar: pasar por preferencia o lo podemos sacar el total del carrito en localstorage(inseguro?)
    preferenceId: preferenceId,
  };

  const customization = {
    paymentMethods: {
      //ticket: "all",
      //creditCard: "all",
      //prepaidCard: "all",
      //debitCard: "all",
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
        .then((response) => {
          resolve();
        })
        .catch((error) => {
          reject();
        });
    });
  };

  const onError = async (error) => {
    console.log("Error en el Brick:", error);
  };

  const onReady = async () => {
    console.log("Brick listo");
  };

  console.log(preferenceId)
  return (
    <div>
      <CartHeader />
      <h2 className="text-2xl font-semibold mb-4">Finalizar compra</h2>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-bold mb-4">Resumen de productos</h3>
          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-4 mb-4 border-b pb-4">
              <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded" />
              <div>
                <h4 className="font-semibold">{item.title}</h4>
                <p className="text-gray-500 text-sm">{item.description}</p>
                <p className="font-bold mt-1">${item.price}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex-1 bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-bold mb-4">Pago seguro</h3>
          {!preferenceId ? (
            <p>Cargando Brick de MercadoPago...</p>
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
  );
};

export default CheckoutPage;
