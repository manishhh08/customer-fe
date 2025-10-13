import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Auth from "./auth/Auth";
import PublicLayout from "./components/layout/PublicLayout";
import PrivateLayout from "./components/layout/PrivateLayout";
import Homepage from "./pages/Homepage/Homepage";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import { getCustomerDetail } from "./features/customer/customerAction";
import "react-toastify/dist/ReactToastify.css";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCustomerDetail());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAllCategoriesAction());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Homepage />} />
          <Route path="auth" element={<AuthPage />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>

        <Route
          element={
            <Auth>
              <PrivateLayout />
            </Auth>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="product" element={<ProductDetail />} />
        </Route>
      </Routes>

      <ToastContainer
        position="top-right"
        theme="light"
        autoClose={2000}
        closeOnClick
        newestOnTop
        draggable
      />
    </>
  );
}

export default App;
