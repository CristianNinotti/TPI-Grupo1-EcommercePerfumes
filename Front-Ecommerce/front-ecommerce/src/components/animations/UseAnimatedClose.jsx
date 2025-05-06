import { useState, useEffect } from 'react';

export const useAnimatedClose = (isOpen, onClose) => {
  const [isVisible, setIsVisible] = useState(false); // Controla la visibilidad del modal
  const [isClosing, setIsClosing] = useState(false); // Controla si está cerrándose
  const [playSound, setPlaySound] = useState(false); // Estado para controlar el sonido de cierre

  const handleAnimatedClose = () => {
    setIsClosing(true);  // Comienza la animación de cierre
    setPlaySound(true);  // Indica que se debe reproducir el sonido de cierre

    // Ejecutar el callback onClose después de la animación
    setTimeout(() => {
      onClose();  // Llamada al callback onClose que actualiza el estado en el padre
      setIsVisible(false);  // Después de la animación, ocultamos el modal
      setPlaySound(false);  // Reseteamos el estado para el sonido
    }, 100);  // Duración de la animación
  };

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true); // Muestra el modal cuando isOpen es verdadero
      setIsClosing(false); // Resetea el estado de la animación de cierre
    }
  }, [isOpen]); // Se ejecuta cuando cambia isOpen

  return { isVisible, isClosing, handleAnimatedClose, playSound };
};