import { useState, useEffect } from 'react';
import { playCloseSound, playOpenSound } from '../sounds/Sounds';

export const useAnimatedClose = (isOpen, onClose) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Sonido y visibilidad al abrir
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsClosing(false);
      
    }
  }, [isOpen]);

  // Maneja el cierre animado y el sonido
  const handleAnimatedClose = () => {
    setIsClosing(true);
    
    setTimeout(() => {
      if (onClose) onClose();
      setIsVisible(false);
    }, 300); // Ajusta según la duración de tu animación
  };

  return { isVisible, isClosing, handleAnimatedClose };
};