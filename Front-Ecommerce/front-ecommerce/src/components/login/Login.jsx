import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { playOpenSound } from '../sounds/Sounds';


const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [nameAccount, setNameAccount] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    playOpenSound();

    try {
      await login({ nameAccount, password });

      localStorage.setItem("userPassword", password);


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

  const handleRegisterRedirect = () => {
    navigate("/register");
    playOpenSound();
  };

  const handleBackHome = () => {
    navigate("/");
    playOpenSound();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-gray-200 p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Iniciar sesión</h2>

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
              className="w-full text-black p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-200"
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
              className="w-full text-black p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-200"
            />
          </div>
          <button
            type="submit"
            className={`w-full p-3 font-semibold rounded-md ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-400 hover:bg-blue-600 hover:text-white"} transition duration-200`}
            disabled={isLoading}
          >
            {isLoading ? "Cargando..." : "Ingresar"}
          </button>
        </form>

        <div className="text-center mt-4">
          <button
            type="button"
            onClick={() => navigate("/forgot-password")}
            className="text-sm text-blue-600 hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        <div className="mt-6 flex flex-row justify-center items-center gap-2">
          <p className="text-sm">
            ¿No estás registrado?{" "}
          </p>
          <button
            type="button"
            onClick={handleRegisterRedirect}
            className="p-3 bg-blue-400  hover:bg-blue-600 hover:text-white font-semibold rounded-md transition duration-200"
          >
            Registrarme
          </button>

        </div>
      </div>
      <button
        onClick={handleBackHome}
        className="p-3 bg-green-400 hover:bg-green-600 hover:text-white font-semibold rounded-md transition duration-200 m-5"
      >
        Volver al Inicio
      </button>
    </div>
  );
};

export default Login;
