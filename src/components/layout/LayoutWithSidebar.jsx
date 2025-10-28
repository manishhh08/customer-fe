import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Outlet } from "react-router-dom";
import { FaArrowUp, FaCommentDots } from "react-icons/fa";

import Header from "./Header";
import Footer from "./Footer";
import SideBar from "./SideBar.jsx";
import { fetchAllCategoriesAction } from "../../features/category/categoryAction";
import ChatCard from "../customCard/ChatCard.jsx";

const LayoutWithSidebar = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const toggleChat = () => setIsChatOpen((prev) => !prev);

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
      setIsMobile(window.innerWidth < 992);
      setSidebarOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  // Show scroll-top button
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
            // minHeight: "calc(100vh - 100px)",
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
          bottom: "20px",
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

      {/* Chatbot toggle button */}
      <button
        onClick={() => setIsChatOpen(true)}
        className="position-fixed rounded-circle border-0 shadow btn-neo"
        style={{
          bottom: "80px",
          right: "30px",
          width: "45px",
          height: "45px",
          cursor: "pointer",
          zIndex: 1100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FaCommentDots />
      </button>

      {/* Floating ChatBot */}
      {isChatOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "140px",
            right: "20px",
            width: "350px",
            height: "400px",
            zIndex: 1200,
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            background: "#fff",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <ChatCard isOpen={isChatOpen} onToggle={toggleChat} />
          <button
            onClick={() => setIsChatOpen(false)}
            style={{
              position: "absolute",
              top: "5px",
              right: "5px",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontSize: "16px",
              color: "#333",
            }}
          >
            ✖
          </button>
        </div>
      )}

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
