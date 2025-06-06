import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { useAnimatedClose } from '../animations/UseAnimatedClose';

const Contact = ({ isOpen, onClose }) => {
  const { isVisible, isClosing, handleAnimatedClose } = useAnimatedClose(isOpen, onClose);

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        'service_3oikwjk',
        'template_1fovu2f',
        {
          from_name: form.name,
          to_name: 'Leo',
          from_email: form.email,
          to_email: 'leomattsantana@gmail.com',
          message: form.message,
        },
        'tR8m_NQ4tJRzUb666'
      )
      .then(
        () => {
          setLoading(false);
          alert('Gracias por contactarte, me comunicaré lo antes posible.');
          setForm({
            name: '',
            email: '',
            message: '',
          });
          handleAnimatedClose();
        },
        (error) => {
          setLoading(false);
          console.log(error);
          alert('Algo salió mal, pero no es culpa tuya c:');
        }
      );
  };

  if (!isVisible) return null; // No renderiza nada si el modal no es visible

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity ${isClosing ? 'opacity-0' : 'opacity-100'}`}
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
    >
      <div
        className={`bg-white p-6 rounded-xl border-2 border-gray-600 max-w-xl w-full shadow-lg overflow-y-auto max-h-[90vh] transition-all transform ${isClosing ? 'scale-95' : 'scale-100'}`}
      >
        <h1 className="text-xl font-bold mb-4 text-black">Contacto</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col text-black font-medium">
            Tu nombre
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Ingresa tu nombre"
              className="p-2 border rounded"
              required
            />
          </label>
          <label className="flex flex-col text-black font-medium">
            Tu email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Ingresa tu mail"
              className="p-2 border rounded"
              required
            />
          </label>
          <label className="flex flex-col text-black font-medium">
            Mensaje
            <textarea
              rows="5"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Deja tu mensaje aquí"
              className="p-2 border rounded"
              required
            />
          </label>
          <button
            type="submit"
            className="bg-blue-400 text-black hover:bg-blue-600 hover:text-white px-4 py-2 rounded-lg"
          >
            {loading ? 'Enviando...' : 'Enviar'}
          </button>
          <button
            type="button"
            onClick={handleAnimatedClose}
            className="bg-green-400 text-black hover:bg-green-600 hover:text-white px-4 py-2 rounded-lg"
          >
            Cerrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;