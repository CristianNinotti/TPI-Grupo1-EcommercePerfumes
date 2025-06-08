import { createContext, useState, useEffect, useContext } from "react";
import useUser from "../hooks/useUser";

export const CartContext = createContext();
const URL = "https://localhost:7174/api/";

export const CartProvider = ({ children }) => {
  const { user } = useUser();
  const [cartItems, setCartItems] = useState([]);
  const [orderId, setOrderId] = useState(null);

  const fetchCart = async () => {
    if (!user) {
      setCartItems([]);
      localStorage.removeItem("orderId");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${URL}Order/OrderStatusTrue`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || 'Error al obtener el carrito');
      }

      const data = await res.json();

      if (data && data.id) {
        localStorage.setItem("orderId", data.id);
      } else {
        localStorage.removeItem("orderId");
      }

      let items = data.orderItems || [];

      const groupedItems = Object.values(
        items.reduce((acc, item) => {
          if (!acc[item.productId]) {
            acc[item.productId] = { ...item };
          } else {
            acc[item.productId].quantity += item.quantity;
            acc[item.productId].totalPrice += item.totalPrice;
          }
          return acc;
        }, {})
      );

      const itemsWithProduct = await Promise.all(
        groupedItems.map(async (item) => {
          if (item.product) return item;
          try {
            const resProd = await fetch(`${URL}Product/ProductById/${item.productId}`);
            const product = await resProd.json();
            return { ...item, product };
          } catch {
            return item;
          }
        })
      );

      setCartItems(itemsWithProduct);
      console.log(itemsWithProduct)
    } catch (err) {
      console.error("Error al obtener el carrito", err);
      setCartItems([]);
      localStorage.removeItem("orderId");
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = async (productId, quantity = 1) => {
    let currentOrderId = parseInt(localStorage.getItem("orderId"));
    let token = localStorage.getItem("token");
    console.log(token)

    if (!currentOrderId) {
      const res = await fetch(`${URL}Order/CreateOrder`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });
      const data = await res.json();
      console.log(data);

      currentOrderId = data;
      setOrderId(currentOrderId);
      console.log(currentOrderId);
    }

    await fetch(`${URL}OrderItem/CreateOrderItem`, {
      method: "POST",
      body: JSON.stringify({
        orderId: currentOrderId,
        productId,
        quantity,
      }),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    });

    await fetchCart();
  };


  const removeFromCart = async (orderItemId) => {
    const token = localStorage.getItem("token");
    try {
      await fetch(`${URL}OrderItem/HardDeleteOrderItem/${orderItemId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });

      await fetchCart();
    } catch (err) {
      console.error("Error al eliminar producto del carrito", err);
    }
  };

  const clearCart = async () => {
    const token = localStorage.getItem("token");
    const orderId = localStorage.getItem("orderId");
    try {
      await fetch(`${URL}Order/HardDeleteOrder/${orderId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });
      await fetchCart();
    } catch (err) {
      console.error("Error al vaciar el carrito", err);
    }
  };

  const decreaseQuantity = async (productId) => {
    const token = localStorage.getItem("token");
    const orderId = localStorage.getItem("orderId");

    const item = cartItems.find(i => i.productId === productId);
    if (!item) return;

    if (item.quantity <= 1) {
      await removeFromCart(item.id); 
      return;
    }

    try {
      await fetch(`${URL}OrderItem/UpdateOrderItem/${item.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          orderId: parseInt(orderId),
          productId,
          quantity: item.quantity - 1,
        }),
      });
      await fetchCart();
    } catch (err) {
      console.error("Error al disminuir cantidad", err);
    }
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
