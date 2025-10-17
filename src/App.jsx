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
import { fetchAllCategoriesAction } from "./features/category/categoryAction";
import Checkout from "./pages/Checkout";
import ThankYou from "./pages/ThankYou";
import Verify from "./pages/Verify/Verify";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCustomerDetail());
    // dispatch(fetchAllProductsAction());
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(fetchAllCategoriesAction());
  // }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Homepage />} />
          <Route path="auth" element={<AuthPage />} />
          <Route path="cart" element={<Cart />} />
          <Route path="verify" element={<Verify />} />
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
          <Route path="checkout" element={<Checkout />} />
          <Route path="thank-you" element={<ThankYou />} />
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
