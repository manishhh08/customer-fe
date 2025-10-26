import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import SideBar from "./SideBar.jsx";
import { Outlet } from "react-router-dom";
import { fetchAllCategoriesAction } from "../../features/category/categoryAction";
import { FaArrowUp } from "react-icons/fa";

const LayoutWithSidebar = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [isSidebarOpen, setSidebarOpen] = useState(false); // closed on load
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const { categories, subCategories } = useSelector(
    (store) => store.categoryStore
  );

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  // Fetch categories
  useEffect(() => {
    dispatch(fetchAllCategoriesAction());
  }, [dispatch]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 992;
      setIsMobile(mobile);
      setSidebarOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  // Show scroll button when content leaves viewport
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const shiftMargin = isSidebarOpen && !isMobile ? "250px" : "0px";

  return (
    <div className="d-flex flex-column min-vh-100 position-relative bg-light">
      {/* Header */}
      <Header toggleSidebar={toggleSidebar} />

      {/* Content Row */}
      <div className="d-flex flex-grow-1" style={{ marginTop: "72px" }}>
        {/* Sidebar */}
        <SideBar
          isOpen={isSidebarOpen}
          closeSidebar={closeSidebar}
          categories={categories}
          subcategories={subCategories}
        />

        {/* Main content overlay click disables content */}
        {isSidebarOpen && (
          <div
            onClick={closeSidebar}
            className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
            style={{ zIndex: 1048, transition: "opacity 0.3s ease" }}
          />
        )}

        {/* Main content */}
        <main
          className="flex-grow-1 position-relative bg-light"
          style={{
            marginLeft: shiftMargin,
            transition: "margin-left 0.3s ease, opacity 0.3s ease",
            opacity: isSidebarOpen ? 0.8 : 1,
            filter: isSidebarOpen ? "blur(2px)" : "none",
            pointerEvents: isSidebarOpen ? "none" : "auto",
            userSelect: isSidebarOpen ? "none" : "auto",
            overflowY: "auto",
            padding: 0,
            minHeight: "calc(100vh - 100px)",
            zIndex: 1,
          }}
        >
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <Footer />

      {/* Scroll to top button */}
      <button
        onClick={handleScrollTop}
        className="position-fixed rounded-circle border-0 shadow btn-neo"
        style={{
          bottom: "30px",
          right: "30px",
          width: "45px",
          height: "45px",
          cursor: "pointer",
          zIndex: 1100,
          opacity: showScrollTop ? 1 : 0,
          pointerEvents: showScrollTop ? "auto" : "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "opacity 0.4s ease, transform 0.2s ease",
        }}
      >
        <FaArrowUp />
      </button>

      <style>
        {`
          .scroll-top-btn:hover {
            transform: scale(1.2);
            background-color: #0056b3;
          }
        `}
      </style>
    </div>
  );
};

export default LayoutWithSidebar;
