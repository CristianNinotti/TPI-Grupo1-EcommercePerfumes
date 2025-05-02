import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './components/home/Home'
import Productos from './components/productos/Productos'
import Register from './components/register/Register'
import { AuthProvider } from './context/AuthContext'
import Login from './components/login/Login'
// import LoginMinorista from './components/login/LoginMinorista';
// import LoginMayorista from './components/login/LoginMayorista';

function App() {
  const router = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/productos', element: <Productos /> },
    { path: '/registro', element: <Register /> },
    { path: '/login', element: <Login /> },
  //   { path: '/login/minorista', element: <LoginMinorista /> },
  // { path: '/login/mayorista', element: <LoginMayorista /> }
  ])

  return (
    <AuthProvider>  
      <div>
        <RouterProvider router={router} />
      </div>
  </AuthProvider>
  )
}

export default App
