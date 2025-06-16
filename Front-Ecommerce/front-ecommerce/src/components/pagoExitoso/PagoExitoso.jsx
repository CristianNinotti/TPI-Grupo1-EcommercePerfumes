import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function PagoExitoso() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const status = params.get("status");

    if (status === "success") {
      Swal.fire("¡Pago exitoso!", "Tu pago fue aprobado.", "success").then(() => {
        navigate("/");
      });
    } else if (status === "failure") {
      Swal.fire("Pago rechazado", "Tu pago fue rechazado o cancelado.", "error").then(() => {
        navigate("/cart");
      });
    } else if (status === "pending") {
      Swal.fire("Pago pendiente", "Tu pago está pendiente de aprobación.", "info").then(() => {
        navigate("/");
      });
    }
  }, [location, navigate]);

  return null;
}