// src/components/productos/Productos.jsx
import { useEffect, useState } from "react";
import CategoryCard from "../categoryCard/CategoryCard";
import PerfumeCard from "../perfumeCard/PerfumeCard";
import Perfume from "../../assets/image/inicio/aa.webp";

function Productos({ limit = null }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("https://localhost:7174/api/product/AllProducts", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) throw new Error("Error al traer productos");
        return res.json();
      })
      .then(data => setProducts(data))
      .catch(err => console.error(err))
      .finally(() => setLoadingProducts(false));
  }, []);

  
  useEffect(() => {
    fetch("https://localhost:7174/api/category/AllCategories")
      .then(res => {
        if (!res.ok) throw new Error("Error al traer categorías");
        return res.json();
      })
      .then(data => setCategories(data))
      .catch(err => console.error(err))
      .finally(() => setLoadingCategories(false));
  }, []);

  
  const filtered = selectedCategoryId
    ? products.filter(p => p.categoryId === selectedCategoryId)
    : products;


  const displayProducts = limit ? filtered.slice(0, limit) : filtered;

  return (
    <div>

      <div className="flex justify-center mb-6">
        <h2 className="text-2xl font-bold">
          Perfumes y Fragancias 
        </h2>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {loadingCategories
          ? <p className="text-gray-600">Cargando categorías…</p>
          : categories.map(cat => (
              <CategoryCard
                key={cat.id}
                categoryName={cat.name}
                categoryAvailable={cat.available}
                isSelected={cat.id === selectedCategoryId}
                onClick={() => {
                  //si clickeas la misma, saca el filtro
                  setSelectedCategoryId(
                    selectedCategoryId === cat.id ? null : cat.id
                  );
                }}
              />
            ))
        }
      </div>

      {loadingProducts
        ? <p className="text-center">Cargando productos…</p>
        : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayProducts.map(p => (
              <PerfumeCard
                key={p.id}
                image={Perfume}
                volume="100 ML"
                brand={p.marca}
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
  );
}

export default Productos;
