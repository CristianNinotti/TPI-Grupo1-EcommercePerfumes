import { useEffect, useState } from "react";
// import ProductCard from '../productCard/ProductCard';
import PerfumeCard from "../perfumeCard/PerfumeCard";
import Perfume from "../../assets/image/inicio/aa.webp"

function Productos({ limit = null }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const displayProducts = limit ? products.slice(0, limit) : products;
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
  console.log(products)
  return (
    <>
      <div>
        <div className="flex justify-center mb-6">
          <h2 className="text-2xl font-bold">
            Perfumes y Fragancias para Mujer y Hombre
          </h2>
        </div>
        {loading ? (
          <p>Cargando productos...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ml-70">
            {displayProducts.map(p => (
              <PerfumeCard
              key={p.id}
              image={Perfume}   
              volume="100 ML"                              
              brand="Marca Genérica"                       
              name={p.name}
              originalPrice={p.price.toFixed(2)}          
              discountedPrice={p.price.toFixed(2)}
              discountPercentage={0}                      
              installments={{
                count: 1,
                perInstallment: p.price.toFixed(2)
              }}
              cftea="CFTEA: 0%"
              priceWithoutTax=""                          
            />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Productos;