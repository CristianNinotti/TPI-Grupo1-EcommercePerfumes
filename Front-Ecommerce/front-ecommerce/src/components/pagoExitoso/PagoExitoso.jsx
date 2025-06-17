import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useCart from "../../hooks/useCart";
import useUser from "../../hooks/useUser";

export default function PagoExitoso() {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCartFrontend, cartItems } = useCart();
  const { user } = useUser();

  /* -------------------------------------------------------------------------
  esto sirve para que el useEffect de abajo se ejecute solo una vez
  sino se renderiza varias veces por los parametros que le definimos abajo
  (son necesarios, sino el useEffect se ejecuta antes de que algunos parametros
  esten definidos, como user, cartItems, etc)
  ---------------------------------------------------------------------------*/
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;

    const params = new URLSearchParams(location.search);
    const status = params.get("status");
    const orderString = localStorage.getItem("cart");
    const order = orderString ? JSON.parse(orderString) : null;
    const orderId = order && order.length > 0 ? order[0].orderId : null;

    if (!user || !cartItems || cartItems.length === 0) return;

    if (status === "success" && order && user && orderId) {
      hasRun.current = true;

      const token = localStorage.getItem("token");
      const rawTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
      const isMayoristaConDescuento = user?.accountType === "Mayorista" && typeof user?.discountRate === "number" && user.discountRate < 1;
      const discountRate = isMayoristaConDescuento ? user.discountRate : 1;
      const discountAmount = rawTotal * (1 - discountRate);
      const totalAmount = rawTotal - discountAmount;

      fetch("https://localhost:7174/api/Payment/CreatePayment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          orderId: Number(orderId),
          amount: totalAmount,
          payMethod: 1,
        }),
      })
        .then(async res => {
          if (!res.ok) {
            const error = await res.text();
            console.error("Error del backend:", error);
          }
        })
        .catch(err => console.error("Error en fetch:", err));

      clearCartFrontend();
      Swal.fire("¡Pago exitoso!", "Tu pago fue aprobado.", "success").then(() => {
        navigate("/");
      });
    } else if (status === "failure") {
      hasRun.current = true;
      Swal.fire("Pago rechazado", "Tu pago fue rechazado o cancelado.", "error").then(() => {
        navigate("/cart");
      });
    } else if (status === "pending") {
      hasRun.current = true;
      Swal.fire("Pago pendiente", "Tu pago está pendiente de aprobación.", "info").then(() => {
        navigate("/");
      });
    }
  }, [location, user, cartItems, clearCartFrontend, navigate]);

  return null;
}