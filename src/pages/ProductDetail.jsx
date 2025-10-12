import React from "react";
// import product from "../assets/product.png";
import { Button, Col, Row, Tab, Tabs } from "react-bootstrap";
import { RiStarSLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
const ProductDetail = () => {
  const stars = 5;
  {
    /* Declaring the stars that I want */
  }
  return (
    // py : padding on the y axis
    <div className="container py-5 mt-5">
      <h3 className="display-4  text-center "> Product Landing</h3>

      <Row className="g-4 align-items-center mt-5">
        {/* Adding the product image here */}
        <Col md={6} className="d-flex  justify-content-center">
          {/* <div style={{ maxWidth: "450px", width: "100%", height: "0%" }}>
            <img
              src={product}
              alt="Product"
              className="img-fluid rounded shadow"
            />
          </div> */}
        </Col>
        <Col md={6}>
          <div className="d-flex flex-column justify-content-center  align-items-start h-100">
            <h2 className="mb-2 ">Gadget Name</h2>
            <p className="mb-3">Gadget Desc</p>

            <div className="d-flex gap-1 mb-3">
              {Array.from({ length: stars }).map((_, index) => (
                <RiStarSLine key={index} size={24} />
              ))}
            </div>
            <div className="d-flex flex-column p-3 mb-2 border border-secondary-subtle rounded shadow-sm backdrop-blur-sm w-100">
              <h2 className="mb-3">Key Features</h2>
              <ul className="mb-1 d-flex align-items-start flex-column">
                <li>Premium Build Quality</li>
                <li>Latest Technology</li>
                <li>Extended Warranty</li>
                <li>Fast Performance</li>
              </ul>
            </div>

            {/* Button aligned naturally under content */}
            <div className="btn-neo">
              <Button as={Link} to="/cart" style={{ width: "200px" }}>
                Add to Cart
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="py-5 g-5 mt-10 mb-5">
        <Col>
          {/* tab bar */}

          <Tabs
            defaultActiveKey="description"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="description" title="Description"></Tab>

            <Tab eventKey="reviews" title="Reviews"></Tab>
          </Tabs>

          {/* content area  */}
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetail;
