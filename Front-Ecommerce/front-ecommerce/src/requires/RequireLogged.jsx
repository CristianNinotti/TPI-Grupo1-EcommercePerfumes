import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function RequireLogged({ children }) {
  const { auth, loading } = useContext(AuthContext);

  if (loading) {
    return null;
  }

  if (!auth.loggedIn) {
    return <Navigate to="/AccessDenied" replace />;
  }

  return children;
}
