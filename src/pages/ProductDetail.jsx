import React, { useEffect, useState } from "react";
import { Button, Col, Row, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { BsArrowLeft } from "react-icons/bs";
import { useParams, useNavigate } from "react-router-dom";
import { fetchAllProductsAction } from "../features/product/productAction";
import { addToCart } from "../features/cart/cartSlice";
import { ShowStars } from "../components/stars/Stars";

const ProductDetail = () => {
  const { products } = useSelector((store) => store.productStore);
  const [product, setProduct] = useState({});
  const [mainImage, setMainImage] = useState("");
  const dispatch = useDispatch();
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllProductsAction());
  }, [dispatch]);

  useEffect(() => {
    const foundProduct = products.find((item) => item.slug === slug);
    if (foundProduct) {
      setProduct(foundProduct);
      setMainImage(foundProduct.images?.[0]);
    }
  }, [products, slug]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleThumbnailClick = (imgUrl) => {
    setMainImage(imgUrl);
  };

  return (
    <div className="bg-dark text-light min-vh-100 d-flex flex-column">
      <Container fluid className="hero-wrap py-5 flex-grow-1">
        <Button
          size="lg"
          bsPrefix="neo"
          className="btn-ghost rounded-4 px-4 mb-5 d-flex align-items-center"
          onClick={() => navigate(-1)}
        >
          <BsArrowLeft className="me-2" /> Back to Products
        </Button>

        <Row className="g-5 align-items-start">
          <Col md={6} className="d-flex flex-column align-items-center">
            <div
              className="rounded-4 shadow-lg overflow-hidden mb-4"
              style={{ maxWidth: "450px", width: "100%" }}
            >
              <img
                src={mainImage}
                alt={product?.name || "Product"}
                className="img-fluid w-100"
                style={{ objectFit: "cover", borderRadius: "1rem" }}
              />
            </div>

            <div className="d-flex flex-wrap justify-content-center gap-3">
              {product?.images?.map((img, i) => (
                <div
                  key={i}
                  className={`border rounded-3 p-1 ${
                    img === mainImage
                      ? "border-info shadow"
                      : "border-secondary"
                  }`}
                  style={{
                    width: "80px",
                    height: "80px",
                    cursor: "pointer",
                    overflow: "hidden",
                  }}
                  onClick={() => handleThumbnailClick(img)}
                >
                  <img
                    src={img}
                    alt={`thumbnail-${i}`}
                    className="img-fluid w-100 h-100"
                    style={{ objectFit: "cover", borderRadius: "0.5rem" }}
                  />
                </div>
              ))}
            </div>
          </Col>

          <Col md={6}>
            <h2 className="mb-3 fw-bold">{product?.name}</h2>
            <p className="mb-4 text-white-50 fs-6">{product?.description}</p>

            <div className="mb-4">
              <span className="fw-semibold me-2">Average Rating:</span>
              <ShowStars averageRating={product?.averageRating} />
            </div>

            <p className="mb-4 text-white-50 fs-4">$ {product?.price}</p>

            <Button
              type="button"
              size="lg"
              bsPrefix="neo"
              className="btn-neo rounded-4 px-5 py-2 d-inline-flex align-items-center"
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </Button>
          </Col>
        </Row>

        <hr className="border-secondary opacity-25 my-5" />

        <Row className="justify-content-center pb-3">
          <Col md={8}>
            <h5 className="mb-4">Customer Reviews</h5>
            {product?.reviews && product.reviews.length > 0 ? (
              product.reviews.map((r, index) => (
                <div
                  key={index}
                  className="p-4 mb-3 rounded-4 border border-secondary bg-dark-subtle"
                >
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <strong>{r?.user?.name || "Anonymous"}</strong>
                    <ShowStars averageRating={r.rating} />
                  </div>
                  <p className="text-white-50 mb-2">{r.comment}</p>
                  <small className="text-secondary">
                    {new Date(r.createdAt).toLocaleDateString()}
                  </small>
                </div>
              ))
            ) : (
              <p className="text-center text-white-50 mb-0">
                No reviews yet for this product.
              </p>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductDetail;
