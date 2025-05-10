import React, { useEffect, useState } from "react";
import { initMercadoPago, Payment } from "@mercadopago/sdk-react";
import CartHeader from "../cartHeader/cartHeader"; 

const CheckoutPage = () => {
  const [preferenceId, setPreferenceId] = useState(null);

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
    amount: 10.50, // puedes omitir esto si ya lo pasas por la preferencia
    preferenceId: preferenceId,
  };

  const customization = {
    paymentMethods: {
      ticket: "all",
      creditCard: "all",
      prepaidCard: "all",
      debitCard: "all",
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
      <CartHeader/>
      <h2>Finalizar compra</h2>
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
  );
};

export default CheckoutPage;
