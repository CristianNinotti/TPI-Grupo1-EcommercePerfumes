import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { playOpenSound } from '../sounds/Sounds';

const Register = () => {
    const { register } = useContext(AuthContext);
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        nameAccount: "",
        password: "",
        email: "",
        dni: "",
        phoneNumber: "",
        address: "",
        categoria: "",
        cuit: "",
    });

    const [typeUser, setTypeUser] = useState("Minorista");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      playOpenSound();
      try {
          if (typeUser !== "Mayorista" && typeUser !== "Minorista") {
              setError("Selecciona un tipo de usuario válido");
              Swal.fire({
                icon: 'warning',
                title: 'Tipo de usuario no válido',
                text: 'Selecciona Mayorista o Minorista.',
              });
              return;
          }

          await register(formData, typeUser);

          await Swal.fire({
            icon: 'success',
            title: `${typeUser} registrado exitosamente`,
            showConfirmButton: false,
            timer: 1500
          });

          setFormData({
              firstName: "",
              lastName: "",
              nameAccount: "",
              password: "",
              email: "",
              dni: "",
              phoneNumber: "",
              address: "",
              categoria: "",
              cuit: "",
          });
          setTypeUser("");
          setError("");
          navigate("/login");
           // Testing
}  catch (error) {
  console.error(error);

  let errorMessage = "Error al registrar";

  if (error instanceof Response) {
    const text = await error.text();
    errorMessage = text;
  } else if (error.message) {
    errorMessage = error.message;
  }

  setError(errorMessage);
  Swal.fire({
    icon: 'error',
    title: 'Error al registrar',
    text: errorMessage,
  });
}

  };
  
  const handleLoginRedirect = () => {
    navigate("/login");
    playOpenSound();
  };
  
  const handleBackHome = () => {
    navigate("/");
    playOpenSound();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-gray-200 max-w-md mx-auto p-8 border border-gray-300 rounded-lg shadow-lg mt-15">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Crear Cuenta</h2>

        <div className="flex justify-center mb-6 gap-4">
          <button
            className={`px-6 py-2 rounded-full font-semibold ${typeUser === "Minorista" ? "bg-green-600 text-white" : "bg-green-400 hover:bg-green-600 hover:text-white"}`}
            onClick={() => {
              playOpenSound();
              setTypeUser("Minorista");
            }}
          >
            Minorista
          </button>
          <button
            className={`px-6 py-2 rounded-full font-semibold ${typeUser === "Mayorista" ? "bg-green-600 text-white" : "bg-green-400 hover:bg-green-600 hover:text-white"}`}
            onClick={() => {
              playOpenSound();
              setTypeUser("Mayorista");
            }}
          >
            Mayorista
          </button>
        </div>

        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="Nombre"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full text-black p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Apellido"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-full text-black p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="nameAccount"
            placeholder="Nombre de usuario"
            value={formData.nameAccount}
            onChange={handleChange}
            required
            className="w-full text-black p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full text-black p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full text-black p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            name="dni"
            placeholder="DNI"
            value={formData.dni}
            onChange={handleChange}
            required
            className="w-full text-black p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Teléfono"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className="w-full text-black p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="address"
            placeholder="Dirección"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full text-black p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {typeUser === "Mayorista" && (
            <>
              <input
                type="text"
                name="categoria"
                placeholder="Categoría de Mayorista"
                value={formData.categoria}
                onChange={handleChange}
                required
                className="w-full text-black p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                name="cuit"
                placeholder="CUIT"
                value={formData.cuit}
                onChange={handleChange}
                required
                className="w-full text-black p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </>
          )}

          <button
            type="submit"
            className="w-full p-3 bg-blue-400 rounded-md font-semibold hover:bg-blue-600 hover:text-white transition duration-200"
          >
            Registrarme
          </button>
        </form>
        <div className="mt-6 flex flex-row justify-center items-center gap-2">
          <p className="text-sm">
            ¿Ya estás registrado?{" "}
          </p>
          <button
            type="button"
            onClick={handleLoginRedirect}
            className="p-3 bg-blue-400  hover:bg-blue-600 hover:text-white font-semibold rounded-md transition duration-200"
          >
            Ingresar
          </button>
          
        </div>
      </div>
      <button
        onClick={handleBackHome}
        className="p-3 bg-green-400 hover:bg-green-600 hover:text-white font-semibold rounded-md transition duration-200 m-5"
      >
        Volver al Home
      </button>
    </div>
  );
};

export default Register;
