import { useEffect, useState } from "react";
import CategoryCard from "../categoryCard/CategoryCard";
import PerfumeCard from "../perfumeCard/PerfumeCard";
import Perfume from "../../assets/image/inicio/aa.webp";
import "./Products.css";
import { useNavigate, useLocation } from "react-router-dom";

function Productos({ limit = null }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryId = params.get("categoryId");
    if (categoryId) {
      setSelectedCategoryId(Number(categoryId));
    }
  }, [location.search]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("https://localhost:7174/api/product/AllProducts", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al traer productos");
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((err) => console.error(err))
      .finally(() => setLoadingProducts(false));
  }, []);

  useEffect(() => {
    fetch("https://localhost:7174/api/category/AllCategories")
      .then((res) => {
        if (!res.ok) throw new Error("Error al traer categorías");
        return res.json();
      })
      .then((data) => setCategories(data))
      .catch((err) => console.error(err))
      .finally(() => setLoadingCategories(false));
  }, []);

  const filtered = selectedCategoryId
    ? products.filter((p) => p.categoryId === selectedCategoryId)
    : products;

  const displayProducts = limit ? filtered.slice(0, limit) : filtered;

  const handleCategoryClick = (categoryId) => {
    if (selectedCategoryId === categoryId) {
      setSelectedCategoryId(null);
      navigate("/products");
    } else {
      setSelectedCategoryId(categoryId);
      navigate(`/products?categoryId=${categoryId}`);
    }
  };

  return (
    <div className="products">
      <div className="flex justify-center mb-6">
        <h2 className="text-2xl font-bold">Perfumes y Fragancias</h2>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {loadingCategories ? (
          <p className="text-gray-600">Cargando categorías…</p>
        ) : (
          categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              categoryId={cat.id}
              categoryName={cat.name}
              categoryAvailable={cat.available}
              isSelected={cat.id === selectedCategoryId}
              onClick={() => handleCategoryClick(cat.id)}
            />
          ))
        )}
      </div>
      {loadingProducts ? (
        <p className="text-center">Cargando productos…</p>
      ) : (
        <ul className="product-list">
          {displayProducts.map((p) => (
            <li key={p.id} className="product-card">
              <PerfumeCard
                volume={p.description}
                brand={p.marca}
                name={p.name}
                originalPrice={p.price.toFixed(2)}
                discountedPrice={p.price.toFixed(2)}
                discountPercentage={0}
                installments={{
                  count: 1,
                  perInstallment: p.price.toFixed(2),
                }}
                cftea="CFTEA: 0%"
                priceWithoutTax=""
                onClick={() => navigate(`/product/${p.id}`)}
              />
            </li>
          ))}
        </ul>
      )}

    </div>
  );
}

export default Productos;
