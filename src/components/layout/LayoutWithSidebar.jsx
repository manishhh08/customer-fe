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

  const { categories, subCategories } = useSelector(
    (store) => store.categoryStore
  );
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
      <div className="d-flex">
        <SideBar
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          isMobile={isMobile}
          categories={categories}
          subcategories={subCategories}
        />
        <main
          className="flex-grow-1 min-vh-100"
          style={{
            marginLeft: isSidebarOpen && !isMobile ? "250px" : "0px",
            transition: "margin-left 0.3s ease",
          }}
        >
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default LayoutWithSidebar;
