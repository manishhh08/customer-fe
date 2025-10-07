import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
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

export default MainLayout;
