import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import RoutesComponent from "./components/routes/Routes";
import { CartProvider } from "./context/CartContext";
import { ThemeProvider } from "./context/ThemeContext";




function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <CartProvider>
            <RoutesComponent />
          </CartProvider>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;