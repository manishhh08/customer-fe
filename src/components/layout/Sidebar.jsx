import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

const SideBar = ({
  isOpen,
  toggleSidebar,
  isMobile,
  categories,
  subcategories,
}) => {
  const [expandedCategory, setExpandedCategory] = useState(null);

  const handleToggle = (id) => {
    setExpandedCategory(expandedCategory === id ? null : id);
  };

  return (
    <>
      {/* Removed the div as it did not seem to make any difference in the layout */}
      <div
        className="hero-wrap position-fixed d-flex flex-column"
        style={{
          top: 69,
          left: 0,
          bottom: 0,
          width: isOpen ? "250px" : "0px",
          transition: "all 0.3s ease",
          overflowX: "hidden",
          overflowY: isOpen ? "auto" : "hidden",
          zIndex: 1050,
        }}
      >
        {isOpen && (
          <Nav className="flex-column px-2 mt-3">
            {categories?.map((cat) => {
              const childSubs = subcategories?.filter(
                (sub) => sub.parent === cat._id
              );

              return (
                <div key={cat._id} className="mb-1">
                  <Nav.Link
                    className="text-white px-2 py-1 rounded hover-bg d-flex justify-content-between align-items-center parent-category"
                    onClick={() => handleToggle(cat._id)}
                  >
                    {cat.name}
                    {childSubs.length > 0 && (
                      <IoIosArrowForward
                        style={{
                          transform:
                            expandedCategory === cat._id
                              ? "rotate(90deg)"
                              : "rotate(0deg)",
                          transition: "transform 0.3s",
                        }}
                      />
                    )}
                  </Nav.Link>

                  {expandedCategory === cat._id && childSubs.length > 0 && (
                    <Nav className="flex-column ms-3 mt-1">
                      {childSubs.map((sub) => (
                        <Nav.Link
                          key={sub._id}
                          as={Link}
                          to={`/category/${sub._id}`}
                          className="text-white px-3 py-1 hover-bg"
                          onClick={isMobile ? toggleSidebar : undefined}
                        >
                          {sub.name}
                        </Nav.Link>
                      ))}
                    </Nav>
                  )}
                </div>
              );
            })}
          </Nav>
        )}
      </div>
    </>
  );
};

export default SideBar;
