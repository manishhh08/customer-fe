import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import Auth from "../../auth/Auth";

const MainLayout = () => {
  return (
    <>
      {/* <Auth> */}
      <Header />
      <main className="min-vh-100">
        <Outlet />
      </main>
      <Footer />
      {/* </Auth> */}
    </>
  );
};

export default MainLayout;
