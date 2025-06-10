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
import { useAuth } from "../../context/AuthContext";
import useFavorites from "../../hooks/useFavorites";

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
  const [selectedGender, setSelectedGender] = useState(null);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const { mode } = useTheme();
  const { user, auth} = useAuth();
  const { favorites, isFavorite, reloadFavorites } = useFavorites(user);
  const { cartItems, addToCart } = useCart();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryId = params.get("categoryId");
    const gender = params.get("gender"); // <--- AGREGADO
    if (categoryId) {
      setSelectedCategoryId(Number(categoryId));
    } else {
      setSelectedCategoryId(null);
    }
    if (gender) {
      setSelectedGender(gender);
    } else {
      setSelectedGender(null);
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

  // FILTRO POR CATEGORÍA Y GÉNERO
  let filtered = products
    .filter((p) =>
      selectedCategoryId ? p.categoryId === selectedCategoryId : true
    )
    .filter((p) => {
      if (!selectedGender) return true;
      // Soporta tanto "Genero" como "genero"
      const genero = p.Genero || p.genero || "";
      return genero.toLowerCase() === selectedGender.toLowerCase();
    });

  // Filtro por favoritos si está activo
  if (showOnlyFavorites) {
    filtered = filtered.filter((p) => favorites.includes(p.id));
  }

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
  const searchParams = new URLSearchParams(location.search);
  const gender = searchParams.get("gender");

  if (selectedCategoryId === categoryId) {
    setSelectedCategoryId(null);
    // Mantenemos el género si existía
    if (gender) {
      navigate(`/products?gender=${gender}`);
    } else {
      navigate("/products");
    }
  } else {
    setSelectedCategoryId(categoryId);
    // Armamos la nueva URL con categoryId y, si aplica, el gender
    const newParams = new URLSearchParams();
    newParams.set("categoryId", categoryId);
    if (gender) newParams.set("gender", gender);

    navigate(`/products?${newParams.toString()}`);
  }
};
  const inactiveButtonClass =
    mode === "dark"
      ? "bg-gray-700 text-white hover:bg-gray-600"
      : "bg-gray-200 text-black hover:bg-green-400";

  // Cuando se activa/desactiva el filtro de favoritos, recarga favoritos
  useEffect(() => {
    if (showOnlyFavorites) {
      reloadFavorites();
    }
  }, [showOnlyFavorites, reloadFavorites]);

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
            onClick={() =>
              setSortOrder((prev) => (prev === "asc" ? "default" : "asc"))
            }
            className={`px-3 py-1 rounded border ${
              sortOrder === "asc" ? "bg-green-600 text-white" : inactiveButtonClass
            }`}
          >
            Precio ↓
          </button>
          <button
            onClick={() =>
              setSortOrder((prev) => (prev === "desc" ? "default" : "desc"))
            }
            className={`px-3 py-1 rounded border ${
              sortOrder === "desc" ? "bg-green-600 text-white" : inactiveButtonClass
            }`}
          >
            Precio ↑
          </button>
          {auth.loggedIn && (
            <button
              onClick={() => setShowOnlyFavorites((prev) => !prev)}
              className={`px-3 py-1 rounded border ${
                showOnlyFavorites
                  ? "bg-green-600 text-white"
                  : inactiveButtonClass
              }`}
              title="Mostrar solo favoritos"
            >
              Favoritos
            </button>
        )}
        </div>
      </div>

      {loadingProducts ? (
        <p className="text-center">Cargando productos…</p>
      ) : displayProducts.length === 0 ? (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-6 rounded text-center">
          No existen productos para los filtros seleccionados.
        </div>
      ) : (
        <ul className="product-list">
          {displayProducts.map((p) => (
            <li key={p.id} className="product-card">
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
