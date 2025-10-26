import React, { useEffect, useState } from "react";
import product from "../assets/product.webp";
import { Button, Col, Row, Tab, Tabs, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ShowStars, Stars } from "../components/stars/Stars";
import { BsArrowLeft } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { fetchAllProductsAction } from "../features/product/productAction";
import { addToCart } from "../features/cart/cartSlice";
import { getReviewsByProductApi } from "../features/review/reviewAPI";
import { FaStar } from "react-icons/fa";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const { products } = useSelector((store) => store.productStore);

  const [product, setProduct] = useState({});
  const [reviews, setReviews] = useState([]);

  // ✅ 1. Fetch all products (if not already loaded)
  useEffect(() => {
    dispatch(fetchAllProductsAction());
  }, [dispatch]);

  // ✅ 2. Find the product by slug
  useEffect(() => {
    const foundProduct = products.find((item) => item.slug === slug);
    setProduct(foundProduct);
  }, [products, slug]);

  // ✅ 3. Fetch only active reviews for this product
  useEffect(() => {
    const fetchReviews = async () => {
      if (product?._id) {
        const res = await getReviewsByProductApi(product._id);
        console.log("📦 Reviews API response:", res);

        if (res.status === "success") {
          console.log("✅ Setting reviews:", res.data);
          setReviews(res.data);
        } else {
          console.log("❌ Error response:", res);
        }
      }
    };
    fetchReviews();
  }, [product]);

  // ✅ Add to cart handler
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

          {/* Product Info */}
          <Row className="g-4 align-items-center">
            <Col md={6} className="d-flex justify-content-center">
              <div style={{ maxWidth: "450px", width: "100%" }}>
                <img
                  src={product?.images}
                  alt={product?.name}
                  className="img-fluid rounded shadow"
                />
              </div>
            </Col>

            <Col md={6}>
              <h2 className="mb-2">{product?.name}</h2>
              <p className="mb-3">{product?.description}</p>

              {/* <div>
                Average Rating:{" "}
                <ShowStars averageRating={product?.averageRating} />
              </div> */}

              <Button
                type="submit"
                size="lg"
                bsPrefix="neo"
                className="btn-neo rounded-4 px-4 mt-4"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </Button>
            </Col>
          </Row>

          {/* ✅ Reviews Section */}
          <div className="mt-5 text-white">
            <h5 className="mb-3">Customer Reviews</h5>

            {!reviews || reviews.length === 0 ? (
              <div className="text-white">No reviews yet for this product.</div>
            ) : (
              reviews.map((rev) => (
                <div
                  key={rev._id}
                  className="p-3 mb-3 rounded-3"
                  style={{ background: "rgba(255,255,255,0.06)" }} // subtle bg, optional
                >
                  {/* Customer name (plain white) */}
                  <div className="mb-1" style={{ fontWeight: 600 }}>
                    {(rev.customerId?.fname || "") +
                      " " +
                      (rev.customerId?.lname || "")}
                  </div>
                  {/* Rating */}
                  <div className="d-flex align-items-center mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar
                        key={i}
                        color={i < rev.rating ? "#ffc107" : "#e4e5e9"}
                        size={16}
                      />
                    ))}
                  </div>
                  {/* Title + Comment (plain white) */}
                  <p className="mb-1" style={{ fontWeight: 600 }}>
                    {rev.title}
                  </p>
                  <p className="mb-0">{rev.comment}</p>
                </div>
              ))
            )}
          </div>
        </Container>
      </section>
    </div>
  );
};

export default ProductDetail;
