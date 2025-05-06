// NO importamos nada ya que no es necesario cuando se guardan los archivos en Public, porque vite no maneja bien los sonidos en rutas relativas

// Función para reproducir sonidos
const playSound = (sound, speed = 1) => {
    const audio = new Audio(sound);
    audio.playbackRate = speed;  // Controla la velocidad de reproducción
    audio.play();
};

// Función para reproducir el sonido de cierre
export const playCloseSound = () => playSound('/sounds/Close.mp3', 1.2);  // Aceleramos el sonido de cierre
export const playOpenSound = () => playSound('/sounds/Open.mp3');