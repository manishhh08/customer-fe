import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

const SideBar = ({ categories, subcategories, isOpen, closeSidebar }) => {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const sidebarRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        closeSidebar();
        setHoveredCategory(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeSidebar]);

  return (
    <aside
      ref={sidebarRef}
      className="position-fixed top-0 h-100 bg-dark text-light"
      style={{
        width: "250px",
        left: isOpen ? "0" : "-250px",
        transition: "left 0.25s ease",
        overflowX: "visible",
        zIndex: 1050,
      }}
    >
      <ul className="list-unstyled m-0 p-2">
        {categories.map((cat) => {
          const subCats = subcategories.filter((sub) => sub.parent === cat._id);
          const hasSub = subCats.length > 0;

          return (
            <li
              key={cat._id}
              className="position-relative py-2 px-3"
              onMouseEnter={() => hasSub && setHoveredCategory(cat._id)}
              onMouseLeave={() => hasSub && setHoveredCategory(null)}
              style={{ cursor: "pointer" }}
            >
              <div className="d-flex align-items-center justify-content-between">
                <span
                  className="text-decoration-none text-light flex-grow-1"
                  to={`/category/${cat.slug}`}
                >
                  {cat.name}
                </span>

                {hasSub && <FaChevronRight style={{ flexShrink: 0 }} />}
              </div>

              {hasSub && (
                <ul
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "100%",
                    minWidth: "180px",
                    padding: "5px 0",
                    margin: 0,
                    listStyle: "none",
                    backgroundColor: "#343a40",
                    borderRadius: "0.25rem",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
                    opacity: hoveredCategory === cat._id && isOpen ? 1 : 0,
                    transform:
                      hoveredCategory === cat._id && isOpen
                        ? "translateX(0)"
                        : "translateX(-20px)",
                    pointerEvents:
                      hoveredCategory === cat._id && isOpen ? "auto" : "none",
                    transition: "transform 0.3s ease, opacity 0.3s ease",
                    zIndex: 1060,
                  }}
                >
                  {subCats.map((sub) => (
                    <li
                      key={sub._id}
                      className="px-3 py-2"
                      style={{ listStyle: "none" }}
                    >
                      <Link
                        to={`/category/${cat.slug}/${sub.slug}`}
                        className="text-decoration-none text-light"
                      >
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default SideBar;
