import React, { useEffect, useState } from "react";
import { Button, Col, Row, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { BsArrowLeft } from "react-icons/bs";
import { useParams, useNavigate } from "react-router-dom";
import { fetchAllProductsAction } from "../features/product/productAction";
import { addToCart } from "../features/cart/cartSlice";
import { getReviewsByProductApi } from "../features/review/reviewAPI";
import { FaStar } from "react-icons/fa";
import { ShowStars } from "../components/stars/Stars";

const ProductDetail = () => {
  const { products } = useSelector((store) => store.productStore);
  const [product, setProduct] = useState({});
  const [mainImage, setMainImage] = useState("");
  const dispatch = useDispatch();
  const { slug } = useParams();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);

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

        <Row className="g-4 align-items-start">
          <Col md={6} className="d-flex flex-column align-items-center">
            <div
              className="overflow-hidden rounded-4 shadow mb-4 w-100 d-flex justify-content-center align-items-center"
              style={{ maxWidth: "400px" }}
            >
              <img
                src={mainImage}
                alt={product?.name}
                className="img-fluid rounded shadow-sm"
                style={{
                  objectFit: "cover",
                  maxHeight: "500px",
                  transition: "transform 0.3s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              />
            </div>

            <div className="d-flex flex-wrap justify-content-center gap-2">
              {product?.images?.map((img, i) => (
                <div
                  key={i}
                  className={`border rounded-3 overflow-hidden shadow-sm ${
                    img === mainImage ? "border-info" : "border-secondary"
                  }`}
                  style={{ width: "80px", height: "80px", cursor: "pointer" }}
                  onClick={() => handleThumbnailClick(img)}
                >
                  <img
                    src={img}
                    alt={`thumbnail-${i}`}
                    className="img-fluid w-100 h-100"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>
          </Col>

          <Col md={6}>
            <h2 className="mb-2">{product?.name}</h2>
            <p className="mb-3">{product?.description}</p>

            <div>
              Average Rating:
              <ShowStars averageRating={product?.averageRating} />
            </div>
            <h3 className="my-3 ">$ {product?.price}</h3>
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
    </div>
  );
};

export default ProductDetail;
