import React, { useEffect, useState } from "react";
import { Button, Col, Row, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { BsArrowLeft } from "react-icons/bs";
import { useParams, useNavigate } from "react-router-dom";
import { fetchAllProductsAction } from "../features/product/productAction";
import { addToCart } from "../features/cart/cartSlice";
<<<<<<< HEAD
import { getReviewsByProductApi } from "../features/review/reviewAPI";
import { FaStar } from "react-icons/fa";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const { products } = useSelector((store) => store.productStore);
=======
import { ShowStars } from "../components/stars/Stars";

const ProductDetail = () => {
  const { products } = useSelector((store) => store.productStore);
  const [product, setProduct] = useState({});
  const [mainImage, setMainImage] = useState("");
  const dispatch = useDispatch();
  const { slug } = useParams();
  const navigate = useNavigate();
>>>>>>> 11d426ccfeaf6c803778b7ec9aa0375c3054a18f

  const [product, setProduct] = useState({});
  const [reviews, setReviews] = useState([]);

  // ✅ 1. Fetch all products (if not already loaded)
  useEffect(() => {
    dispatch(fetchAllProductsAction());
  }, [dispatch]);

  // ✅ 2. Find the product by slug
  useEffect(() => {
    const foundProduct = products.find((item) => item.slug === slug);
<<<<<<< HEAD
    setProduct(foundProduct);
=======
    if (foundProduct) {
      setProduct(foundProduct);
      setMainImage(foundProduct.images?.[0]);
    }
>>>>>>> 11d426ccfeaf6c803778b7ec9aa0375c3054a18f
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

<<<<<<< HEAD
=======
  const handleThumbnailClick = (imgUrl) => {
    setMainImage(imgUrl);
  };

>>>>>>> 11d426ccfeaf6c803778b7ec9aa0375c3054a18f
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

<<<<<<< HEAD
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
=======
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
>>>>>>> 11d426ccfeaf6c803778b7ec9aa0375c3054a18f
    </div>
  );
};

export default ProductDetail;
