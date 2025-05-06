import { createContext, useContext, useEffect, useState } from "react";

const URL = "https://localhost:7174/api/";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState({ loggedIn: false });

  const register = async (valores, tipoCuenta) => {
    try {
      let endpoint = "";
  
      if (tipoCuenta === "Minorista") {
        endpoint = "Minorista/CreateMinorista";
      } else if (tipoCuenta === "Mayorista") {
        endpoint = "Mayorista/CreateMayorista";
      } else {
        throw new Error("Tipo de cuenta inválido");
      }
  
      const response = await fetch(`${URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(valores),
      });
  
      if (!response.ok) {
        const contentType = response.headers.get("content-type");
  
        let data;
        if (contentType && contentType.includes("application/json")) {
          // Si la respuesta es JSON, la parseamos
          data = await response.json();
        } else {
          // Si no es JSON, usamos el texto plano
          data = await response.text();
        }
  
        throw new Error(data.message || data || "Error al crear el usuario");
      }
  
      return true;
    } catch (error) {
      console.error(error);
      throw new Error(error.message || "Error al registrar usuario");
    }
  };
  

  const login = async ({ nameAccount, password }) => {
    try {
      const response = await fetch(`${URL}Authentication/authenticate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nameAccount, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Credenciales incorrectas");
      }

      const token = await response.text();
      setUser(token); // Almacena el token
      localStorage.setItem("token", token); // Guarda el token en el localStorage

      // Setea el estado de autenticación
      setAuth({ loggedIn: true, token });

      return true;
    } catch (error) {
      console.error(error);
      throw new Error(error.message || "Error al iniciar sesión");
    }
  };

  const logout = () => {
    setUser(null);
    setAuth({ loggedIn: false });
    localStorage.removeItem("token");
  };

  // Verifica el token en el localStorage al cargar la app
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser(token);
      setAuth({ loggedIn: true, token });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, auth, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);