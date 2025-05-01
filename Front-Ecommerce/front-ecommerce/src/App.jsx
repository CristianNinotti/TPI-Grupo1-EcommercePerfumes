import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './components/home/Home'
import Productos from './components/productos/Productos'

function App() {
  const router = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: "/productos", element: <Productos /> },
  ])

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
