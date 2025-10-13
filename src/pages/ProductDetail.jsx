import React, { useState } from "react"; // ✅ add useState here
import product from "../assets/product.webp";
import { Button, Col, Row, Tab, Tabs } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Stars } from "../components/stars/Stars";

const ProductDetail = () => {
  const { products } = useSelector((store) => store.productStore);
  const [myRating, setMyRating] = useState(0); // ✅ useState works now

  return (
    <div className="bg-dark text-light">
      <section className="hero-wrap py-5 py-md-6">
        <h3 className="display-4 text-center fw-bold lh-tight">
          Product Landing
        </h3>

        <Row className="g-4 align-items-center mt-5">
          <Col md={6} className="d-flex justify-content-center">
            <div style={{ maxWidth: "450px", width: "100%" }}>
              <img
                src={product}
                alt="Product"
                className="img-fluid rounded shadow"
              />
            </div>
          </Col>

          <Col md={6}>
            <div className="d-flex flex-column justify-content-center align-items-start h-100">
              <h2 className="mb-2">Gadget Name</h2>
              <p className="mb-3">Gadget Desc</p>

              {/* Interactive Stars */}
              <div className="mb-3">
                <Stars
                  stars={myRating}
                  editable
                  onChange={(val) => setMyRating(val)}
                />

                <p className="text-white  mt-2">
                  {myRating > 0
                    ? `You rated this ${myRating} / 5 ⭐`
                    : "Click the stars to rate"}
                </p>
              </div>

              <div
                className="d-flex flex-column p-3 mb-2 rounded w-75 card-neo"
                style={{ background: "var(--neo-d1)" }}
              >
                <h2 className="mb-3">Key Features</h2>
                <ul
                  className="mb-1 d-flex align-items-start flex-column"
                  style={{ gap: "1rem" }}
                >
                  <li>Premium Build Quality</li>
                  <li>Latest Technology</li>
                  <li>Extended Warranty</li>
                  <li>Fast Performance</li>
                </ul>
              </div>

              <Button
                size="lg"
                bsPrefix="neo"
                className="btn-neo rounded-4 px-4 d-inline-flex align-items-center mt-5"
              >
                Add to Cart
              </Button>
            </div>
          </Col>
        </Row>

        <Row className="py-5 g-5 mt-10 mb-5">
          <Col>
            <Tabs
              defaultActiveKey="description"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="description" title="Description"></Tab>
              <Tab eventKey="reviews" title="Reviews"></Tab>
            </Tabs>
          </Col>
        </Row>
      </section>
    </div>
  );
};

export default ProductDetail;
