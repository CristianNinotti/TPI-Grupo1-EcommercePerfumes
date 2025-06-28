import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { useNavigate } from 'react-router-dom';
import { playOpenSound } from '../sounds/Sounds';
import Swal from 'sweetalert2';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate("/");
    playOpenSound();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    setIsLoading(true);

    try {
      const response = await fetch('https://localhost:7174/api/authentication/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        // Leer el mensaje de error del backend
        const errorData = await response.json();
        throw new Error(errorData.message || 'No se pudo generar el token');
      }

      const token = await response.text();
      const resetLink = `https://localhost:5173/reset-password?token=${token}`;

      await emailjs.send(
        'service_798li2e',
        'template_d9dduvy',
        {
          user_email: email,
          reset_link: resetLink,
        },
        'W25JQEpNq8ULE2UAn'
      );

      setStatus('Correo enviado. Revisá tu bandeja de entrada.');

      await Swal.fire({
        icon: 'success',
        title: '¡Correo enviado!',
        text: 'Revisá tu bandeja de entrada para restablecer tu contraseña.',
        confirmButtonColor: '#3085d6',
      });

    } catch (error) {
      setStatus('Error al enviar el correo.');
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'Hubo un problema al enviar el correo',
        confirmButtonColor: '#d33',
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-gray-200 p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Recuperar contraseña
        </h2>

        {status && <p className="text-sm text-center mb-4">{status}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <input
              type="email"
              placeholder="Ingresá tu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full text-black p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-200"
            />
          </div>
          <button
            type="submit"
            className={`w-full p-3 font-semibold rounded-md ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-400 hover:bg-blue-600 hover:text-white"
            } transition duration-200`}
            disabled={isLoading}
          >
            {isLoading ? "Enviando..." : "Enviar correo de recuperación"}
          </button>
        </form>
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

export default ForgotPassword;
