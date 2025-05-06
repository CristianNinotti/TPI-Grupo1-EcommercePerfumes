import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { playCloseSound } from '../sounds/Sounds';

const Contact = ({ isOpen, onClose }) => {
  const formRef = useRef();
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
        "service_3oikwjk",
        "template_1fovu2f",
        {
          from_name: form.name,
          to_name: "Leo",
          from_email: form.email,
          to_email: "leomattsantana@gmail.com",
          message: form.message,
        },
        "tR8m_NQ4tJRzUb666"
      )
      .then(
        () => {
          setLoading(false);
          alert("Gracias por contactarte, me comunicaré lo antes posible.");
          setForm({
            name: "",
            email: "",
            message: "",
          });
          playCloseSound(); // Reproduce el sonido al cerrar la modal
          onClose(); // Llama a la función onClose para cerrar la modal
        },
        (error) => {
          setLoading(false);
          console.log(error);
          alert("Algo salió mal, pero no es culpa tuya c:");
        }
      );
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
    >
      <div className="bg-white p-6 rounded-xl border-2 border-gray-600 max-w-xl w-full shadow-lg overflow-y-auto max-h-[90vh]">
        <h1 className="text-xl font-bold mb-4 text-black">Contacto</h1>
        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            {loading ? "Enviando..." : "Enviar"}
          </button>
          <button
            type="button"
            onClick={onClose} // Aquí utilizas la función pasada por prop
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded mt-2"
          >
            Cerrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;