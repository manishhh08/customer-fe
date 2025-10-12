import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const PrivateLayout = () => {
  return (
    <>
      <Header />
      <main className="min-vh-100">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default PrivateLayout;
