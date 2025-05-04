import React, { useEffect } from "react";

const PaymentBrick = ({ preferenceId, amount }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.mercadopago.com/js/v2";
    script.onload = () => {
      const mp = new window.MercadoPago("TU_PUBLIC_KEY", {
        locale: "es-AR", // o tu localización
      });

      const renderBrick = async () => {
        const bricksBuilder = mp.bricks();
        await bricksBuilder.create("payment", "paymentBrick_container", {
          initialization: {
            amount: amount,
            preferenceId: preferenceId,
          },
          customization: {
            paymentMethods: {
              ticket: "all",
              creditCard: "all",
              prepaidCard: "all",
              debitCard: "all",
              mercadoPago: "all",
            },
          },
          callbacks: {
            onSubmit: async ({ selectedPaymentMethod, formData }) => {
              return new Promise((resolve, reject) => {
                fetch("/process_payment", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(formData),
                })
                  .then((res) => res.json())
                  .then((data) => {
                    console.log("Pago procesado:", data);
                    resolve();
                  })
                  .catch((err) => {
                    console.error("Error al procesar pago", err);
                    reject();
                  });
              });
            },
            onError: async (error) => {
              console.error("Error en el Brick", error);
            },
            onReady: async () => {
              console.log("Brick listo");
            },
          },
        });
      };

      renderBrick();
    };
    document.body.appendChild(script);
  }, [preferenceId, amount]);

  return <div id="paymentBrick_container" />;
};

export default PaymentBrick;
