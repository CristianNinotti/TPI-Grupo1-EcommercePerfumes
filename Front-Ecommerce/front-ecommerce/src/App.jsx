import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import RoutesComponent from "./components/routes/Routes";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <CartProvider>
          <RoutesComponent />
        </CartProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;