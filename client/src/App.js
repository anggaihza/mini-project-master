import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "bootstrap/dist/css/bootstrap.css";
import {
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Merchant from "./pages/Merchant";
import Product from "./pages/Product";
import ProductID from "./pages/ProductID";
import ProductEdit from "./pages/ProductEdit";

const router = createBrowserRouter([
  {path: "/", element: <HomePage />},

  {path: "/register", element: <Register />},
  {path: "/login", element: <Login />},
  {path: "/merchant", element: <Merchant />},
  {path: "/product", element: <Product />},
  {path: "/product-detail/:id", element: <ProductID />},
  {path: "/product-edit/:id", element: <ProductEdit />},
]);

function App() {
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
