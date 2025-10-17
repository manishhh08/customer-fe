import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { BsArrowRight } from "react-icons/bs";
import CustomCard from "./CustomCard";
import { Link } from "react-router-dom";
const CustomFeaturedArea = ({
  majorTitle,
  minorTitle,
  titleDescription,
  products,
  handleAddToCart,
}) => {
  return (
    <Container>
      <div className="text-center mb-4">
        <span className="chip mb-2 d-inline-block">{minorTitle}</span>
        <h2 className="display-6 fw-bold">{majorTitle}</h2>
        <p className="text-white-50">{titleDescription}</p>
      </div>

      <Row className="g-4">
        {products?.slice(0, 4).map((p) => (
          <Col xs={12} md={6} lg={3} key={p._id}>
            <CustomCard product={p} handleAddToCart={handleAddToCart} />
            {/* <div className="card-neo rounded-4 h-100 overflow-hidden">
              <Link
                to={`/product/${p.slug}`}
                className="position-relative featured-media overflow-hidden d-block"
                aria-label={`Open ${p.name}`}
              >
                <img
                  src={
                    p.images ||
                    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1600&auto=format&fit=crop"
                  }
                  alt={p.name}
                />

                <span className="position-absolute top-0 end-0 m-3 chip tag-hot fw-semibold z-2">
                  HOT
                </span>

                {p.stock && (
                  <span className="position-absolute bottom-0 start-0 m-3 chip tag-stock z-2">
                    In Stock
                  </span>
                )}
              </Link>

              <div className="d-flex flex-column p-4">
                <h5 className="mb-1">
                  <Link
                    to={`/product/${p._id}`}
                    className="text-decoration-none link-title"
                  >
                    {p.name}
                  </Link>
                </h5>
                <p className="small text-white-50 mb-3">{p.averageRating}</p>

                <div className="d-flex align-items-baseline gap-2 mb-3">
                  <div className="h4 m-0">${p.price.toFixed(2)}</div>
                  {p.comparePrice && (
                    <del className="text-white-50">
                      ${p.comparePrice.toFixed(2)}
                    </del>
                  )}
                </div>

                <Button
                  onClick={() => handleAddToCart(p)}
                  bsPrefix="neo"
                  className="btn-neo rounded-4 w-100 d-inline-flex align-items-center justify-content-center gap-2 mt-auto"
                >
                  <BsCart /> Add to Cart
                </Button>
              </div>
            </div> */}
          </Col>
        ))}
      </Row>

      <div className="text-center mt-4">
        <Link to="/products">
          <Button
            bsPrefix="neo"
            className="btn-ghost rounded-4 px-4 d-inline-flex align-items-center gap-2"
          >
            View All Products <BsArrowRight />
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export default CustomFeaturedArea;
