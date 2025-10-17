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
