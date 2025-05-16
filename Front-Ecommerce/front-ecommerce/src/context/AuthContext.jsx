import { createContext, useContext, useEffect, useState } from "react";

const URL = "https://localhost:7174/api/";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState({ loggedIn: false });
  const [loading, setLoading] = useState(true);

  const register = async (valores, tipoCuenta) => {
    try {
      let endpoint = "";

      if (tipoCuenta === "Minorista") {
        endpoint = "Minorista/CreateMinorista";
      } else if (tipoCuenta === "Mayorista") {
        endpoint = "Mayorista/CreateMayorista";
        valores.cuit = Number(valores.cuit);
        valores.dni = Number(valores.dni);
      } else {
        throw new Error("Tipo de cuenta inválido");
      }

      const bodyData = tipoCuenta === "Mayorista" ? valores : valores;

      const response = await fetch(`${URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });

      //Testing
if (!response.ok) {
  const contentType = response.headers.get("content-type");

  if (contentType && contentType.includes("application/json")) {
    const data = await response.json();
    throw new Error(data.message || "Error al crear el usuario");
  } else {
    const text = await response.text();
    throw new Error(text || "Error al crear el usuario");
  }
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

      // Buscar en todas las colecciones
      const endpoints = [
        { type: "Minorista", url: `${URL}Minorista/AllMinoristas` },
        { type: "Mayorista", url: `${URL}Mayorista/AllMayoristas` },
        { type: "SuperAdmin", url: `${URL}superAdmin/AllSuperAdmins` },
      ];

      let loggedUser = null;
      let accountType = null;

      for (const endpoint of endpoints) {
        const res = await fetch(endpoint.url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const users = await res.json();
          const found = users.find((u) => u.nameAccount === nameAccount);
          if (found) {
            loggedUser = found;
            accountType = endpoint.type;
            break;
          }
        }
      }

      if (!loggedUser) {
        throw new Error("Usuario no encontrado");
      }

      setUser({
        token,
        accountType,
        id: loggedUser.id,
        address: loggedUser.address,
        available: loggedUser.available,
        dni: loggedUser.dni,
        email: loggedUser.email,
        nameAccount: loggedUser.nameAccount,
        firstName: loggedUser.firstName,
        lastName: loggedUser.lastName,
        phoneNumber: loggedUser.phoneNumber,
        cuit: loggedUser?.cuit,
        categoria: loggedUser?.categoria,
      });

      localStorage.setItem("token", token);
      localStorage.setItem("accountType", accountType);
      localStorage.setItem("nameAccount", nameAccount);
      setAuth({ loggedIn: true, token });
      localStorage.setItem("isLoggedIn", "true");

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
    localStorage.removeItem("accountType");
    localStorage.removeItem("nameAccount");
    localStorage.setItem("isLoggedIn", "false");
};

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const accountType = localStorage.getItem("accountType");

      const fetchUserData = async () => {
        try {
          let userResponse;

          if (accountType === "Minorista") {
            userResponse = await fetch(`${URL}Minorista/AllMinoristas`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
          } else if (accountType === "Mayorista") {
            userResponse = await fetch(`${URL}Mayorista/AllMayoristas`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
          } else if (accountType === "SuperAdmin") {
            userResponse = await fetch(`${URL}superAdmin/AllSuperAdmins`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
          } else {
            throw new Error("Tipo de cuenta no especificado");
          }

          if (!userResponse.ok) {
            throw new Error("No se pudo obtener los datos del usuario");
          }

          const users = await userResponse.json();
          const nameAccount = localStorage.getItem("nameAccount");
          const loggedUser = users.find(
            (user) => user.nameAccount === nameAccount
          );

          if (!loggedUser) {
            throw new Error("Usuario no encontrado");
          }

          setUser({
            token,
            accountType,
            id: loggedUser.id,
            address: loggedUser.address,
            available: loggedUser.available,
            dni: loggedUser.dni,
            email: loggedUser.email,
            nameAccount: loggedUser.nameAccount,
            firstName: loggedUser.firstName,
            lastName: loggedUser.lastName,
            phoneNumber: loggedUser.phoneNumber,
            cuit: loggedUser?.cuit,
            categoria: loggedUser?.categoria,
          });

          setAuth({ loggedIn: true, token });
        } catch (error) {
          console.error("Error al cargar los datos del usuario", error);
          setAuth({ loggedIn: false });
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    } else {
      setAuth({ loggedIn: false });
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, auth, loading, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
