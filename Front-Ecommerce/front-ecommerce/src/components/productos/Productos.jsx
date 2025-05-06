import { useEffect, useState } from "react";
import ProductCard from '../productCard/ProductCard';

function Productos() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Fetch de productos
    fetch("https://localhost:7174/api/product/AllProducts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}` // Esto no es necesario si no necesitas validación en este endpoint
      }
    })
      .then(res => {
        if (!res.ok) throw new Error("Error al traer productos");
        return res.json();
      })
      .then(data => setProducts(data))
      .catch(err => console.error("Error:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Todos los productos</h2>
      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Productos;