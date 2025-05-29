import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { playOpenSound } from '../sounds/Sounds';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState('');
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const tokenFromUrl = searchParams.get('token');
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      setStatus('Token inválido');
    }
  }, [searchParams]);

  const handleBackHome = () => {
    navigate('/');
    playOpenSound();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setStatus('');

    if (!newPassword || !confirmPassword) {
      setError('Ambos campos son obligatorios.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setIsLoading(true);
    setStatus('Procesando...');

    try {
      const response = await fetch('https://localhost:7174/api/authentication/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: token,
          newPassword: newPassword,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error desconocido');
      }

      setStatus('Contraseña restablecida correctamente.');

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (error) {
      setStatus(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-gray-200 p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Restablecer contraseña
        </h2>

        {status && <p className="text-sm text-center mb-4">{status}</p>}
        {error && <p className="text-sm text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Nueva contraseña"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full text-black p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-200"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Confirmar contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full text-black p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-200"
            />
          </div>
          <button
            type="submit"
            className={`w-full p-3 font-semibold rounded-md ${isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-400 hover:bg-blue-600 hover:text-white'
              } transition duration-200`}
            disabled={isLoading}
          >
            {isLoading ? 'Guardando...' : 'Guardar nueva contraseña'}
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

export default ResetPassword;
