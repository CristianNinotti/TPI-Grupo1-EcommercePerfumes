import { useEffect, useState, useMemo } from "react";
import CategoryCard from "../categoryCard/CategoryCard";
import PerfumeCard from "../perfumeCard/PerfumeCard";
import "./Products.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useFilteredProductsByName } from "../../hooks/useSearch";
import SearchProduct from "../searchProduct/SearchProduct";
import CartSidebar from "../cartSidebar/CartSidebar";
import useCart from "../../hooks/useCart";
import { useTheme } from "../../context/ThemeContext"; 

function Productos({ limit = null }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [showCartSidebar, setShowCartSidebar] = useState(false);
  const [lastAddedProduct, setLastAddedProduct] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { mode } = useTheme();

  const { cartItems, addToCart } = useCart();

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

  const productosFiltradosPorNombre = useFilteredProductsByName(filtered, searchTerm);

  const productosOrdenados = useMemo(() => {
    if (sortOrder === "asc") {
      return [...productosFiltradosPorNombre].sort((a, b) => a.price - b.price);
    }
    if (sortOrder === "desc") {
      return [...productosFiltradosPorNombre].sort((a, b) => b.price - a.price);
    }
    return productosFiltradosPorNombre;
  }, [productosFiltradosPorNombre, sortOrder]);

  const displayProducts = limit ? productosOrdenados.slice(0, limit) : productosOrdenados;

  const handleCategoryClick = (categoryId) => {
    if (selectedCategoryId === categoryId) {
      setSelectedCategoryId(null);
      navigate("/products");
    } else {
      setSelectedCategoryId(categoryId);
      navigate(`/products?categoryId=${categoryId}`);
    }
  };
  const inactiveButtonClass =
    mode === "dark"
      ? "bg-gray-700 text-white hover:bg-gray-600"
      : "bg-gray-200 text-black hover:bg-blue-300";

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

      <div className="flex flex-wrap justify-end gap-3 mb-6">
        <SearchProduct value={searchTerm} onChange={setSearchTerm} />
        <div className="flex justify-center gap-4 mb-4">
          <button
            onClick={() => setSortOrder("asc")}
             className={`px-3 py-1 rounded border ${
            sortOrder === "asc" ? "bg-blue-600 text-white" : inactiveButtonClass
          }`}
          >
            Precio ↓
          </button>
          <button
            onClick={() => setSortOrder("desc")}
            className={`px-3 py-1 rounded border ${
              sortOrder === "desc" ? "bg-blue-600 text-white" : inactiveButtonClass
            }`}
          >
            Precio ↑
          </button>
          <button
            onClick={() => setSortOrder("default")}
            className={`px-3 py-1 rounded border ${
              sortOrder === "default"
                ? "bg-blue-600 text-white"
                : `${mode === "dark" ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-gray-200 text-black hover:bg-blue-300"}`
            }`}
          >
            Sin Orden
          </button>
        </div>
      </div>

      {loadingProducts ? (
        <p className="text-center">Cargando productos…</p>
      ) : (
        <ul className="product-list">
          {displayProducts.map((p) => (
            <li key={p.id} className="product-card flex flex-col items-end">
              <PerfumeCard
                id={p.id}
                volume={p.description}
                brand={p.marca}
                name={p.name}
                stock={p.stock}
                originalPrice={p.price}
                discountedPrice={p.price}
                discountPercentage={0}
                installments={{
                  count: 1,
                  perInstallment: p.price.toFixed(2),
                }}
                cftea="CFTEA: 0%"
                priceWithoutTax=""
                onAddToCart={() => {
                  const productToAdd = {
                    id: p.id,
                    title: p.name,
                    description: "100 ML",
                    price: p.price,
                    quantity: 1,
                  };

                  addToCart(productToAdd);
                  setLastAddedProduct(productToAdd);
                  setShowCartSidebar(true);
                }}
                onClick={() => navigate(`/product/${p.id}`)}
              />
            </li>
          ))}
        </ul>
      )}

      <CartSidebar
        isOpen={showCartSidebar}
        onClose={() => setShowCartSidebar(false)}
        lastAddedProduct={lastAddedProduct} />
    </div>
  );
}

export default Productos;
