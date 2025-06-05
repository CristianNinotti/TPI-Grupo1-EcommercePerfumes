import { useState, useEffect } from 'react';
import { playOpenSound, playCloseSound } from '../components/sounds/Sounds'; // Ajusta el path si es necesario

export const useAnimatedClose = (isOpen, onClose) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Sonido y visibilidad al abrir
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsClosing(false);
      playOpenSound(); // Sonido de apertura
    }
  }, [isOpen]);

  // Maneja el cierre animado y el sonido
  const handleAnimatedClose = () => {
    setIsClosing(true);
    playCloseSound(); // Sonido de cierre

    setTimeout(() => {
      if (onClose) onClose();
      setIsVisible(false);
    }, 300); // Ajusta según la duración de tu animación
  };

  return { isVisible, isClosing, handleAnimatedClose };
};