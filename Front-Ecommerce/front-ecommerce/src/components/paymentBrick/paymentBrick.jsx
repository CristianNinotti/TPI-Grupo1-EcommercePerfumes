// src/components/MercadoPagoBrick.jsx
import { useEffect, useState } from "react";

export default function MercadoPagoBrick({ preferenceUrl }) {
  const [preferenceId, setPreferenceId] = useState(null);

  useEffect(() => {
    const fetchPreference = async () => {
      try {
        const response = await fetch(preferenceUrl, {
          method: "POST",
        });
        const data = await response.json();
        setPreferenceId(data.preferenceId);
      } catch (error) {
        console.error("Error al obtener la preferencia:", error);
      }
    };

    fetchPreference();
  }, [preferenceUrl]);

  useEffect(() => {
    if (preferenceId) {
      const mp = new window.MercadoPago("TEST-629cd2b0-3587-415b-aac4-f2889e5d9386", {
        locale: "es-AR",
      });

      mp.bricks().create("wallet", "wallet_container", {
        initialization: { preferenceId },
        customization: {
          paymentMethods: {
            ticket: "all",
            creditCard: "all",
            prepaidCard: "all",
            debitCard: "all",
            mercadoPago: "all",
          },
        },
        onSubmit: async ({ selectedPaymentMethod, formData }) => {
          return fetch("/process_payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          })
            .then((res) => res.json())
            .catch((err) => {
              console.error("Error al procesar pago:", err);
              throw err;
            });
        },
        onError: (error) => console.error("Error en el Brick:", error),
        onReady: () => console.log("Brick listo"),
      });
    }
  }, [preferenceId]);

  return <div id="wallet_container" />;
}
