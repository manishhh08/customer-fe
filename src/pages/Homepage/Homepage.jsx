import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import {
  BsLightningCharge,
  BsShieldCheck,
  BsTruck,
  BsArrowRight,
  BsCart,
} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProductsAction } from "../../features/product/productAction";
import { addToCart } from "../../features/cart/cartSlice";
import { toast } from "react-toastify";
import CustomFeaturedArea from "../../components/customCard/CustomFeaturedArea";

export default function Homepage() {
  const dispatch = useDispatch();
  const [featured, setFeatured] = useState([]);
  const { products } = useSelector((store) => store.productStore);
  const { categories } = useSelector((store) => store.categoryStore);
  useEffect(() => {
    dispatch(fetchAllProductsAction());
  }, [dispatch]);

  const handleAddToCart = (p) => {
    dispatch(addToCart(p));
  };

  const getCreatedAt = (p) => {
    if (p?.createdAt) return new Date(p.createdAt);
    if (p?._id) {
      const ts = parseInt(String(p._id).substring(0, 8), 16) * 1000;
      return new Date(ts);
    }
    return null;
  };

  const isNew = (p, days = 14) => {
    const d = getCreatedAt(p);
    if (!d) return false;
    const now = Date.now();
    const ageDays = (now - d.getTime()) / (1000 * 60 * 60 * 24);
    return ageDays <= days;
  };

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
      <section className="py-5" style={{ background: "var(--neo-d1)" }}>
        <CustomFeaturedArea
          majorTitle="Hot Deals This Week"
          minorTitle="Featured Collection"
          titleDescription="Handpicked selection of the most popular and trending tech
              products"
          products={products}
        />
      </section>

      {/* NEW ARRIVALS */}
      <section className="py-5" style={{ background: "var(--neo-d1)" }}>
        <CustomFeaturedArea
          majorTitle="New Arrivals"
          minorTitle="Just In"
          titleDescription="Fresh drops you’ll love"
          products={products}
        />
      </section>

      {/* BEST SELLERS */}
      <section className="py-5" style={{ background: "var(--neo-d1)" }}>
        <CustomFeaturedArea
          majorTitle="Best Sellers"
          minorTitle="Our best selling products"
          titleDescription="Customer favorited right now"
          products={products}
        />
      </section>

      {/* TESTIMONIALS */}
      <section className="py-5" style={{ background: "var(--neo-d1)" }}>
        <Container>
          <h2 className="display-6 fw-bold text-center mb-4">
            What Customers Say
          </h2>
          <Row className="g-4">
            {[
              {
                name: "Alex P.",
                text: "Super fast delivery and great quality.",
              },
              {
                name: "Jamie L.",
                text: "Love the UI and the deals each week!",
              },
              {
                name: "Priya K.",
                text: "Support was quick to help me choose.",
              },
            ].map((t) => (
              <Col xs={12} md={4} key={t.name}>
                <div className="p-4 rounded-4 card-neo h-100">
                  <div className="mb-2">★★★★★</div>
                  <p className="mb-2 text-white-50">{t.text}</p>
                  <div className="small text-neo fw-semibold">{t.name}</div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CATEGORIES */}
      <section className="py-5" style={{ background: "var(--neo-d1)" }}>
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
