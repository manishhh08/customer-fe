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
  tagLabel,
  tagClass,
}) => {
  return (
    <Container>
      <div className="text-center mb-4">
        <span className="chip mb-2 d-inline-block">{minorTitle}</span>
        <h2 className="display-6 fw-bold">{majorTitle}</h2>
        <hr className="my-3 mx-auto" style={{ width: "5rem" }} />
        <p className="text-white-50">{titleDescription}</p>
      </div>

      <Row className="g-4 align-items-stretch">
        {products?.slice(0, 4).map((p) => (
          <Col xs={12} md={6} lg={3} className="d-flex" key={p._id}>
            <CustomCard
              product={p}
              handleAddToCart={handleAddToCart}
              tagLabel={tagLabel}
              tagClass={tagClass}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CustomFeaturedArea;
