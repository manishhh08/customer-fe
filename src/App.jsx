import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./components/layout/MainLayout";
import Homepage from "./pages/Homepage/Homepage";
import Dashboard from "./pages/Dashboard/Dashboard";
import AuthPage from "./pages/AuthPage";
import { ToastContainer } from "react-toastify";

import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";

function App() {
  return (
    <>
      <div className="wrapper">
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Homepage />} />
            <Route path="auth" element={<AuthPage />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="product" element={<ProductDetail />} />
            <Route path="cart" element={<Cart />} />
          </Route>
        </Routes>
        <ToastContainer position="top-right" theme="light" />
      </div>
    </>
  );
}

export default App;
