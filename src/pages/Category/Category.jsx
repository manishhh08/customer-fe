import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap";

const Category = () => {
  const { slug } = useParams();
  const [view, setView] = useState("grid");

  const { products } = useSelector((store) => store.productStore);

  const filteredProducts = products.filter((p) => {
    // if (!p.category) return false; // skip products without category

    if (typeof p.category === "string") {
      return p.category.toLowerCase() === slug.toLowerCase();
    }

    if (typeof p.category === "object" && p.category.slug) {
      return p.category.slug.toLowerCase() === slug.toLowerCase();
    }

    return false;
  });

  console.log(filteredProducts);

  return (
    <section className="py-5">
      <Container>
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold text-capitalize">{slug}</h2>
          <ToggleButtonGroup
            type="radio"
            name="viewOptions"
            value={view}
            onChange={(val) => setView(val)}
          >
            <ToggleButton id="grid-view" value="grid" variant="outline-primary">
              Grid
            </ToggleButton>
            <ToggleButton id="list-view" value="list" variant="outline-primary">
              List
            </ToggleButton>
          </ToggleButtonGroup>
        </div>

        {/* Grid View */}
        {view === "grid" && (
          <Row className="g-4">
            {filteredProducts.map((p) => (
              <Col xs={12} sm={6} md={4} lg={3} key={p._id}>
                <Card className="h-100 shadow-sm border-0">
                  <Card.Img
                    variant="top"
                    src={p.image}
                    alt={p.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Title>{p.name}</Card.Title>
                    <Card.Text>${p.price}</Card.Text>
                    <Button variant="primary" className="w-100">
                      Add to Cart
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {/* List View */}
        {view === "list" && (
          <div className="d-flex flex-column gap-3">
            {filteredProducts.map((p) => (
              <Card key={p._id} className="shadow-sm border-0">
                <Card.Body className="d-flex align-items-center">
                  <img
                    src={p.image}
                    alt={p.name}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      marginRight: "20px",
                      borderRadius: "10px",
                    }}
                  />
                  <div className="flex-grow-1">
                    <Card.Title>{p.name}</Card.Title>
                    <Card.Text>${p.price}</Card.Text>
                  </div>
                  <Button variant="primary">Add to Cart</Button>
                </Card.Body>
              </Card>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};

export default Category;
