import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function RequireAdmin({ children }) {
  const { auth, user } = useContext(AuthContext);
  // Si no está logueado o no es SuperAdmin, lo redirige al home
  if (!auth.loggedIn || user?.accountType !== "SuperAdmin") {
    return <Navigate to="/" replace />;
  }
  return children;
}
