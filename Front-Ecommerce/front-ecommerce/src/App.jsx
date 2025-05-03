import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import RoutesComponent from "./components/routes/Routes";


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <RoutesComponent />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;