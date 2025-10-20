import React, { useEffect, useState } from "react";
import product from "../assets/product.webp";
import { Button, Col, Row, Tab, Tabs, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ShowStars, Stars } from "../components/stars/Stars";
import { BsArrowLeft } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { fetchAllProductsAction } from "../features/product/productAction";
import { addToCart } from "../features/cart/cartSlice";

const ProductDetail = () => {
  const { products } = useSelector((store) => store.productStore);
  const [myRating, setMyRating] = useState(0);
  const { slug } = useParams();
  const [product, setProduct] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProductsAction());
  }, [dispatch]);

  useEffect(() => {
    const foundProduct = products.find((product) => product.slug === slug);
    setProduct(foundProduct);
  }, [products]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  return (
    <div className="bg-dark text-light w-100">
      <section className="hero-wrap py-5 py-md-6">
        <Container>
          {/* Back Button */}
          <Button
            size="lg"
            bsPrefix="neo"
            className="btn-ghost rounded-4 px-4 mb-4 d-flex align-items-center"
          >
            <BsArrowLeft className="me-2" /> Back to Products
          </Button>

          {/* Product Section */}
          <Row className="g-4 align-items-center">
            <Col md={6} className="d-flex justify-content-center">
              <div style={{ maxWidth: "450px", width: "100%" }}>
                <img
                  src={product?.images}
                  alt="Product"
                  className="img-fluid rounded shadow"
                />
              </div>
            </Col>

            <Col md={6}>
              <div className="d-flex flex-column justify-content-between align-items-start h-100">
                <h2 className="mb-2">{product?.name}</h2>
                <p className="mb-3">{product?.description}</p>
                Average Rating
                <ShowStars averageRating={product?.averageRating} />
                {/* Add to Cart */}
                <Button
                  type="submit"
                  size="lg"
                  bsPrefix="neo"
                  className="btn-neo rounded-4 px-4 d-inline-flex align-items-center mt-4"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </Button>
              </div>
            </Col>
          </Row>

          <div>hello world</div>
        </Container>
      </section>
    </div>
  );
};

export default ProductDetail;
