import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <Header />
      <main
        className="text-center d-flex align-items-center justify-content-center bg-dark text-white"
        style={{ height: "650px" }}
      >
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
