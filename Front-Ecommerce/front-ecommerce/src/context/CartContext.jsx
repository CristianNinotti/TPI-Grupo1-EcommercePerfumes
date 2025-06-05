import { createContext, useState, useEffect, useContext } from "react";
import useUser from "../hooks/useUser";

export const CartContext = createContext();
const URL = "https://localhost:7174/api/";

export const CartProvider = ({ children }) => {
  const { user } = useUser();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      if (!user) {
        setCartItems([]); 
        return;
      }

      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${URL}Order/OrderStatusTrue`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        // ^^ trae los datos de la ORDEN
        // hay que obtener los orderItems de la order para setearlo en cartItems y q funcione el coso del header
        // esto de aca abajo no hace un carajo
        setCartItems(data.items || []);
      } catch (err) {
        console.error("Error al obtener el carrito", err);
        setCartItems([]);
      }
    };

    fetchCart();
  }, [user]);


  // de aca para abajo no vamos a usar nada, hay que seguir cambiando
  // pero si comento el codigo se rompe la pagina :p
  

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      console.log(product.id)

      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          description: product.description || "", // por si no viene
          price: product.price,
          image: product.image || "", // por si no viene
          quantity: quantity,
        }
      ];
    });
  };


  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const decreaseQuantity = (productId) => {
    setCartItems(prev =>
      prev
        .map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };


  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    decreaseQuantity,
    totalItems: cartItems.reduce((sum, item) => sum + item.quantity, 0),
  };


  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
