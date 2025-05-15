import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

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

    const [typeUser, setTypeUser] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
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
  };
  
  const handleBackHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md mx-auto p-8 border border-gray-300 rounded-lg shadow-lg bg-white mt-15">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Crear Cuenta</h2>

        <div className="flex justify-center mb-6 gap-4">
          <button
            className={`px-6 py-2 rounded-full font-semibold text-white ${typeUser === "Minorista" ? "bg-green-500 text-black" : "bg-gray-200 text-gray-700"}`}
            onClick={() => setTypeUser("Minorista")}
          >
            Minorista
          </button>
          <button
            className={`px-6 py-2 rounded-full font-semibold text-white ${typeUser === "Mayorista" ? "bg-green-500 text-black" : "bg-gray-200 text-gray-700"}`}
            onClick={() => setTypeUser("Mayorista")}
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
            className="w-full p-3 bg-green-500 rounded-md font-semibold hover:bg-green-600 transition duration-200"
          >
            Registrarme
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            ¿Ya estás registrado?{" "}
            <button
              type="button"
              onClick={handleLoginRedirect}
              className="text-blue-500 hover:underline font-semibold"
            >
              Ingresar
            </button>
          </p>
        </div>
      </div>
      <button
        onClick={handleBackHome}
        className="mb-8 px-6 py-2 bg-black-500 hover:bg-black-600 font-semibold rounded-md transition duration-200 mt-5"
      >
        Volver al Home
      </button>
    </div>
  );
};

export default Register;
