import { useState, useEffect } from "react";

function getUserKey(user) {
  return user && user.email ? `favorites_${user.email}` : null;
}

export default function useFavorites(user) {
  const userKey = getUserKey(user);
  const [favorites, setFavorites] = useState([]);

  // Cargar favoritos desde localStorage al iniciar y cuando cambie userKey
  useEffect(() => {
    if (userKey) {
      const favs = JSON.parse(localStorage.getItem(userKey)) || [];
      setFavorites(favs);
    } else {
      setFavorites([]);
    }
  }, [userKey]);

  // Escuchar cambios en localStorage (por ejemplo, desde otras pestañas o instancias)
  useEffect(() => {
    function handleStorage(e) {
      if (e.key === userKey) {
        const favs = JSON.parse(e.newValue) || [];
        setFavorites(favs);
      }
    }
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [userKey]);

  // Siempre lee la última versión antes de agregar/quitar
  const addFavorite = (productId) => {
    if (!userKey) return;
    const favs = JSON.parse(localStorage.getItem(userKey)) || [];
    const newFavs = [...new Set([...favs, productId])];
    setFavorites(newFavs);
    localStorage.setItem(userKey, JSON.stringify(newFavs));
  };

  const removeFavorite = (productId) => {
    if (!userKey) return;
    const favs = JSON.parse(localStorage.getItem(userKey)) || [];
    const newFavs = favs.filter((id) => id !== productId);
    setFavorites(newFavs);
    localStorage.setItem(userKey, JSON.stringify(newFavs));
  };

  const isFavorite = (productId) => favorites.includes(productId);

  return { favorites, addFavorite, removeFavorite, isFavorite, userKey };
}