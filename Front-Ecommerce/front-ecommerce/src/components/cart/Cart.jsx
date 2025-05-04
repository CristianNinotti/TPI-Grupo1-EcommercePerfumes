// Por ejemplo: CheckoutPage.jsx
import React, { useEffect } from "react";
import { initMercadoPago } from "@mercadopago/sdk-react"
import { Payment } from '@mercadopago/sdk-react';

const CheckoutPage = () => {
    useEffect(() => {
        initMercadoPago("TEST-629cd2b0-3587-415b-aac4-f2889e5d9386");
    }, []);


    const initialization = {
        amount: 100,
        preferenceId: "<PREFERENCE_ID>",
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
    const onSubmit = async (
        { selectedPaymentMethod, formData }
    ) => {
        // callback llamado al hacer clic en el botón enviar datos
        return new Promise((resolve, reject) => {
            fetch("/process_payment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })
                .then((response) => response.json())
                .then((response) => {
                    // recibir el resultado del pago
                    resolve();
                })
                .catch((error) => {
                    // manejar la respuesta de error al intentar crear el pago
                    reject();
                });
        });
    };
    const onError = async (error) => {
        // callback llamado para todos los casos de error de Brick
        console.log(error);
    };
    const onReady = async () => {
        /*
          Callback llamado cuando el Brick está listo.
          Aquí puede ocultar cargamentos de su sitio, por ejemplo.
        */
    };


    return (
        <div>
            <h2>Finalizar compra (falta agregar mercadopago como opcion, pero se hace creando una preferencia desde el back y ahora tengo mucho sueño para hacerla)</h2>
            <Payment
                initialization={initialization}
                customization={customization}
                onSubmit={onSubmit}
                onReady={onReady}
                onError={onError}
            />
        </div>
    );
};

export default CheckoutPage;
