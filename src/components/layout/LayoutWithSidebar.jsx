import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import Footer from "./Footer";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import { fetchAllCategoriesAction } from "../../features/category/categoryAction";

const LayoutWithSidebar = () => {
  const dispatch = useDispatch();
  const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 992);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  const { categories } = useSelector((store) => store.categoryStore);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const layoutShift = isSidebarOpen && !isMobile ? "250px" : "0px";
  useEffect(() => {
    dispatch(fetchAllCategoriesAction());
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 992;
      setIsMobile(mobile);
      setSidebarOpen(!mobile);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Header toggleSidebar={toggleSidebar} />
      <SideBar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        isMobile={isMobile}
        categories={categories}
      />
      <div
        className="d-flex content-wrapper flex-column min-vh-100"
        style={{
          marginLeft: layoutShift,
          transition: "margin-left 0.3s ease",
        }}
      >
        <main className="flex-grow-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default LayoutWithSidebar;
