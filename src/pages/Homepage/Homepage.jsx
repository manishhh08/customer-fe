import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import {
  BsLightningCharge,
  BsShieldCheck,
  BsTruck,
  BsPhone,
  BsLaptop,
  BsHeadphones,
  BsSmartwatch,
  BsBoxSeam,
  BsArrowRight,
  BsCart,
} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProductsAction } from "../../features/product/productAction";
import { addToCart } from "../../features/cart/cartSlice";
import { toast } from "react-toastify";

export default function Homepage() {
  const dispatch = useDispatch();
  const [featured, setFeatured] = useState([]);
  const { products } = useSelector((store) => store.productStore);
  const { categories } = useSelector((store) => store.categoryStore);
  useEffect(() => {
    dispatch(fetchAllProductsAction());
  }, [dispatch]);

  const handleAddToCart = (p) => {
    // Sending the properly shaped object
    const cartItem = {
      id: p._id,
      name: onabort.name,
      price: p.price,
      quantity: 1,
      image:
        Array.isArray(p.images) && p.images.length > 0
          ? p.images[0]
          : p.images || "https://via.placeholder.com/200",
    };

    dispatch(addToCart(p));
  };

  // navigate("/cart");
  return (
    <div className="bg-dark text-light">
      {/* HERO */}
      <section className="hero-wrap py-5 py-md-6">
        <Container className="py-4 py-lg-5">
          <Row className="align-items-center g-5">
            {/* Left copy */}
            <Col lg={6}>
              <div className="d-inline-flex align-items-center gap-2 pill px-3 py-2 rounded-5 mb-3">
                <span className="badge rounded-pill bg-transparent text-light">
                  New Arrivals Weekly
                </span>
              </div>

              <h1 className="display-3 fw-bold lh-tight mb-3">
                Discover the{" "}
                <span className="d-block text-neo">Future of Tech</span>
              </h1>
              <p className="fs-5 text-white-50 mb-4">
                Premium electronics, cutting-edge gadgets, and exclusive deals.
                Experience technology that transforms your lifestyle.
              </p>

              <div className="d-flex flex-wrap gap-3 mb-4">
                <Link to="/products">
                  <Button
                    size="lg"
                    bsPrefix="neo"
                    className="btn-neo rounded-4 px-4 d-inline-flex align-items-center gap-2"
                  >
                    Explore Collection <BsArrowRight />
                  </Button>
                </Link>
                <Link to="/deals">
                  <Button
                    size="lg"
                    bsPrefix="neo"
                    className="btn-ghost rounded-4 px-4"
                  >
                    View Deals
                  </Button>
                </Link>
              </div>

              <Row className="g-4 pt-2">
                {[
                  ["500+", "Products"],
                  ["50K+", "Happy Customers"],
                  ["99%", "Satisfaction"],
                ].map(([val, label]) => (
                  <Col xs={4} key={label}>
                    <div className="h6 text-neo mb-0">{val}</div>
                    <div className="small text-white-50">{label}</div>
                  </Col>
                ))}
              </Row>
            </Col>

            {/* Right visual */}
            <Col lg={6}>
              <div className="position-relative">
                <div
                  className="position-absolute top-0 start-0 w-100 h-100 rounded-4"
                  style={{
                    background:
                      "linear-gradient(90deg,var(--neo-start),var(--neo-mid),var(--neo-end))",
                    opacity: 0.25,
                    filter: "blur(60px)",
                  }}
                />
                <div
                  className="position-relative rounded-4 overflow-hidden border"
                  style={{ borderColor: "var(--neo-border)" }}
                >
                  <img
                    className="img-fluid"
                    alt="Latest tech products"
                    src="https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1600&auto=format&fit=crop"
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* FEATURED */}
      <section
        className="py-5"
        style={{
          background: "linear-gradient(180deg, var(--neo-d1), var(--neo-d2))",
        }}
      >
        <Container>
          <div className="text-center mb-4">
            <span className="chip mb-2 d-inline-block">
              Featured Collection
            </span>
            <h2 className="display-6 fw-bold">Hot Deals This Week</h2>
            <p className="text-white-50">
              Handpicked selection of the most popular and trending tech
              products
            </p>
          </div>

          <Row className="g-4">
            {products?.slice(0, 4).map((p) => (
              <Col xs={12} md={6} lg={3} key={p._id}>
                <div className="card-neo rounded-4 h-100 overflow-hidden">
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
                    <p className="small text-white-50 mb-3">{p.description}</p>

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
                </div>
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
      </section>

      {/* CATEGORIES */}
      <section
        className="py-5"
        style={{
          background: "linear-gradient(180deg, var(--neo-d2), var(--neo-d1))",
        }}
      >
        <Container>
          <div className="text-center mb-4">
            <h2 className="display-6 fw-bold">Shop by Category</h2>
            <p className="text-white-50">
              Find exactly what you're looking for
            </p>
          </div>

          <Row className="g-3 g-md-4">
            {categories?.map((c) => (
              <Col xs={6} md={4} lg={3} key={c.name}>
                <Link
                  // to={`/category/${c.name.toLowerCase()}`}
                  // bsPrefix="neo"
                  to={`/category/${c.slug}`}
                  bsprefix="neo"
                  className="text-decoration-none"
                >
                  <div className="p-4 rounded-4 card-neo text-center h-100">
                    <div className="icon-pill mx-auto mb-3 fs-4">{c.icon}</div>
                    <div className="text-light fw-semibold">{c.name}</div>
                  </div>
                </Link>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* FEATURES */}
      <section className="py-5" style={{ background: "var(--neo-d1)" }}>
        <Container>
          <Row className="g-4">
            {[
              {
                icon: <BsLightningCharge />,
                title: "Lightning Fast Delivery",
                desc: "Get your tech delivered in 24–48 hours with express shipping",
              },
              {
                icon: <BsShieldCheck />,
                title: "Secure & Safe",
                desc: "Industry-leading security with 100% buyer protection guarantee",
              },
              {
                icon: <BsTruck />,
                title: "Free Shipping",
                desc: "Enjoy free shipping on all orders over $50 with no hidden fees",
              },
            ].map((f) => (
              <Col xs={12} md={6} lg={4} key={f.title}>
                <div className="p-4 rounded-4 card-neo h-100">
                  <div className="d-flex align-items-center gap-3 mb-2">
                    <div className="icon-pill fs-5">{f.icon}</div>
                    <h5 className="mb-0">{f.title}</h5>
                  </div>
                  <p className="text-white-50 mb-0">{f.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </div>
  );
}
