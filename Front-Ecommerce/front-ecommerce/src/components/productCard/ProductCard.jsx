import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";

function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const {addToCart} = useCart();

  // Verificar si el usuario está logueado y obtener las órdenes
  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      setError("Debes estar logueado para ver tus órdenes.");
      setLoadingOrders(false);
      return;
    }

    // Si está logueado, obtener las órdenes asociadas al usuario
    const fetchOrders = async () => {
      try {
        const response = await fetch("https://localhost:7174/api/orders", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener las órdenes.");
        }

        const data = await response.json();
        setOrders(data); // Suponiendo que la respuesta contiene las órdenes asociadas al usuario
      } catch (error) {
        setError(error.message);
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchOrders();
  }, []);

  // Manejar el cambio de orden seleccionada
  const handleOrderChange = (e) => {
    setSelectedOrderId(Number(e.target.value));
  };

  const handleBuy = async () => {
    const token = localStorage.getItem("token");

    // Verificar login
    if (!token) {
      return;
    }

    // Verificar si se seleccionó una orden
    if ( !selectedOrderId || !orders.some(order => order.id === selectedOrderId) ) 
        {
         setError("Debes seleccionar una orden activa válida.");
         return;
        }

    // Verificar stock
    if (quantity < 1 || quantity > product.stock) {
      setError(`Cantidad inválida. Stock disponible: ${product.stock}`);
      return;
    }

    if (product.Available === false) {
      setError("Producto no disponible.");
      return;
    }

    setError(""); // Limpiar el error si todo está bien

    try {
      // Hacemos la solicitud POST para agregar el OrderItem
      const response = await fetch("https://localhost:7174/api/orderitem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          orderId: selectedOrderId, // Usamos el ID de la orden seleccionada
          productId: product.id,
          quantity: quantity,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error del servidor: ${errorText}`);
      }

      alert(`Producto agregado a la orden ${selectedOrderId}`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 w-full max-w-md mx-auto mb-4">
      <h3 className="text-xl font-bold text-gray-800">Nombre: {product.name}</h3>
      <p className="text-gray-600">Descripcion: {product.description}</p>
      <p className="text-gray-600">Categoria: {product.Categoria?.name}</p>
      <p className="text-gray-600">Precio: ${product.price}</p>
      <p className="text-gray-500">Stock disponible: {product.stock}</p>
      <p className="text-gray-500">Disponible: {product.Available ? "Sí" : "No"}</p>

      {/* Validación de login y carga de órdenes */}
      {loadingOrders ? (
        <p className="text-gray-500">Cargando órdenes...</p> ) : (
        <>
          {/* Selección de orden activa */}
          <div className="mt-4">
            <label htmlFor="orderSelect" className="block text-sm font-semibold mb-2">
              Selecciona una orden activa:
            </label>
            <select
              id="orderSelect"
              onChange={handleOrderChange}
              value={selectedOrderId || ""}
              className="w-full p-2 border rounded"
            >
              <option value="">Seleccionar orden</option>
              {orders.map((order) => (
                <option key={order.id} value={order.id}>
                  Orden #{order.id} - Estado: {order.status}
                </option>
              ))}
            </select>
          </div>

          {/* Cantidad y botón para comprar */}
          <div className="mt-4 flex items-center gap-2">
            <input
              type="number"
              value={quantity}
              min="1"
              max={product.stock}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-20 p-2 border rounded"
            />
            <button
              onClick={() => addToCart(product)}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
            >
              Comprar producto
            </button>
          </div>
        </>
      )}

      {/* Mensajes de error */}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}

export default ProductCard;