import { useState } from "react";
import { useAuth } from "../../context/AuthContext"; 
import { useNavigate } from "react-router-dom"; 
import Swal from 'sweetalert2';

const LoginAdmin = () => {
  const { login } = useAuth(); 
  const navigate = useNavigate();
  const [nameAccount, setNameAccount] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const accountType = 'SuperAdmin'; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
        
      await login({ nameAccount, password, accountType });
  
      await Swal.fire({
        icon: 'success',
        title: '¡Ingreso exitoso!',
        text: 'Bienvenido de nuevo',
        confirmButtonColor: '#3085d6',
      });
  
      navigate("/");
    } catch (error) {
      setError(error.message);
  
      Swal.fire({
        icon: 'error',
        title: 'Error al ingresar',
        text: error.message || 'Hubo un problema al iniciar sesión',
        confirmButtonColor: '#d33',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackHome = () => {
    navigate("/");
  };
  
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <button
        onClick={handleBackHome}
        className="mb-8 px-6 py-2 bg-black-500 hover:bg-black-600 text-black font-semibold rounded-md transition duration-200"
      >
        Volver al Home
      </button>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Iniciar sesión - {accountType}</h2>
        
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="nameAccount"
              placeholder="Nombre de cuenta"
              value={nameAccount}
              onChange={(e) => setNameAccount(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-200"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-200"
            />
          </div>
          <button 
            type="submit" 
            className={`w-full p-3 text-black font-semibold rounded-md ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"} transition duration-200`}
            disabled={isLoading}
          >
            {isLoading ? "Cargando..." : "Iniciar sesión"}
          </button>
        </form>

      </div>
    </div>
  );
};

export default LoginAdmin;
