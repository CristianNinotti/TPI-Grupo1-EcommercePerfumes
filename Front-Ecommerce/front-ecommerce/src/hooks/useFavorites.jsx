import { useState, useEffect, useCallback } from "react";

function getUserKey(user) {
  return user && user.nameAccount ? `favorites_${user.nameAccount}` : null;
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

  // Usar useCallback para evitar bucles infinitos en dependencias
  const reloadFavorites = useCallback(() => {
    if (userKey) {
      const favs = JSON.parse(localStorage.getItem(userKey)) || [];
      setFavorites(favs);
    }
  }, [userKey]);

  const addFavorite = (productId) => {
    if (!userKey) return;
    const idNum = Number(productId);
    const favs = (JSON.parse(localStorage.getItem(userKey)) || []).map(Number);
    const newFavs = [...new Set([...favs, idNum])];
    localStorage.setItem(userKey, JSON.stringify(newFavs));
    setFavorites(newFavs); // Actualiza el estado local
  };

  const removeFavorite = (productId) => {
    if (!userKey) return;
    const idNum = Number(productId);
    const favs = (JSON.parse(localStorage.getItem(userKey)) || []).map(Number);
    const newFavs = favs.filter((id) => id !== idNum);
    localStorage.setItem(userKey, JSON.stringify(newFavs));
    setFavorites(newFavs); // Actualiza el estado local
  };

  const isFavorite = (productId) => {
    const idNum = Number(productId);
    return favorites.map(Number).includes(idNum);
  };

  return { favorites, addFavorite, removeFavorite, isFavorite, reloadFavorites, userKey };
}