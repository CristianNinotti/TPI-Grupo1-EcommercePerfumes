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
  

  const login = async ({ nameAccount, password, accountType }) => {
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

      const userResponse = await fetch(`${URL}${accountType === "Minorista" ? "Minorista/AllMinoristas" : "Mayorista/AllMayoristas"}`, {
        headers: {
          "Authorization": `Bearer ${token}`,  
        }
      });      
      
      const users = await userResponse.json();

      const loggedUser = users.find(user => user.nameAccount === nameAccount);

      if (!loggedUser) {
        throw new Error("Usuario no encontrado")
      }

      setUser({
        token,
        accountType,
        id: loggedUser?.id,
        address: loggedUser?.address,
        available: loggedUser?.available,
        dni: loggedUser?.dni,
        email: loggedUser?.email,  
        nameAccount: loggedUser?.nameAccount,
        firstName: loggedUser?.firstName,
        lastName: loggedUser?.lastName,
        phoneNumber: loggedUser?.phoneNumber,
      });
  
      localStorage.setItem("token", token);
      localStorage.setItem("accountType", accountType) 
      localStorage.setItem("nameAccount", nameAccount)
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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const accountType = localStorage.getItem("accountType"); 
      console.log(accountType, 'account')
      const fetchUserData = async () => {
        try {
          let userResponse;
  
          if (accountType === "Minorista") {
            userResponse = await fetch(`${URL}Minorista/AllMinoristas`, {
              headers: {
                "Authorization": `Bearer ${token}`,
              }
            });
          } else if (accountType === "Mayorista") {
            userResponse = await fetch(`${URL}Mayorista/AllMayoristas`, {
              headers: {
                "Authorization": `Bearer ${token}`,
              }
            });
          } else {
            throw new Error("Tipo de cuenta no especificado");
          }
  
          if (!userResponse.ok) {
            throw new Error("No se pudo obtener los datos del usuario");
          }
  
          const users = await userResponse.json();
          
          console.log(localStorage.getItem("nameAccount"), 'localstoreage'); 
          const loggedUser = users.find(user => user.nameAccount === localStorage.getItem("nameAccount"));
            
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
          });
          console.log(user, 'user')
          setAuth({ loggedIn: true, token });
        } catch (error) {
          console.error("Error al cargar los datos del usuario", error);
          setAuth({ loggedIn: false });
        }
      };
  
      fetchUserData();
    } else {
      setAuth({ loggedIn: false });
    }
  }, []);
  

  return (
    <AuthContext.Provider value={{ user, auth, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);