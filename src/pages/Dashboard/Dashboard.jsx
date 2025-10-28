import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Badge, Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { addToCart } from "../../features/cart/cartSlice";
import { BsCart } from "react-icons/bs";
import {
  BsPersonCircle,
  BsBoxSeam,
  BsArrowRight,
  BsCartPlus,
} from "react-icons/bs";

import { fetchAllProductsAction } from "../../features/product/productAction";
import { retrieveAllOrder } from "../../features/order/orderAPI";

const statusVariant = (s) => {
  const v = String(s || "").toLowerCase();
  if (v.includes("delivered")) return "success";
  if (v.includes("shipped")) return "warning";
  if (v.includes("processing") || v.includes("received")) return "primary";
  return "secondary";
};
const fmtDate = (d) => (d ? new Date(d).toLocaleDateString() : "—");
const getCreatedAt = (x) => {
  if (!x) return new Date(0);
  if (x.createdAt) return new Date(x.createdAt);
  if (x._id) {
    const ts = parseInt(String(x._id).substring(0, 8), 16) * 1000;
    return new Date(ts);
  }
  return new Date(0);
};

function SectionRecs({ products }) {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="card-neo rounded-4 p-4">
      <div className="d-flex justify-content-between align-items-center mb-2 text-white">
        <h5 className="m-0">Recommended for you</h5>
        <Link to="/products" className="btn-ghost neo rounded-4">
          See more
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="text-white-50">No recommendations yet.</div>
      ) : (
        <div className="rec-grid">
          {products.map(
            (p) => (
              console.log(p),
              (
                <div key={p._id} className="rec-tile text-center">
                  <div className="rec-media position-relative overflow-hidden">
                    <img src={p.images[0]} alt={p.name} />
                    <div className="rec-hover position-absolute d-flex align-items-center justify-content-center flex-column gap-2 p-3">
                      <Link
                        to={`/product/${p.slug || p._id}`}
                        className="btn-ghost neo border rounded-4 w-100"
                      >
                        View
                      </Link>
                      <Button
                        type="button"
                        size="lg"
                        bsPrefix="neo"
                        className="btn-neo rounded-4 w-100 gap-2"
                        onClick={() => handleAddToCart(p)}
                      >
                        <BsCart /> Add to Cart
                      </Button>
                    </div>
                  </div>
                  <div className="rec-info text-white p-2">
                    <div className="name fw-bold" title={p.name}>
                      {p.name}
                    </div>
                    <div className="price">
                      ${Number(p.price || 0).toFixed(2)}
                    </div>
                  </div>
                </div>
              )
            )
          )}
        </div>
      )}
    </div>
  );
}

function SectionRecentOrders({ orders }) {
  const recent = [...orders]
    .sort((a, b) => new Date(b?.createdAt || 0) - new Date(a?.createdAt || 0))
    .slice(0, 5);

  return (
    <div className="card-neo rounded-4 p-3">
      <div className="d-flex justify-content-between align-items-center mb-2 text-white">
        <h5 className="m-0">Recent orders</h5>
        <Link to="/orders" className="btn-ghost neo rounded-4">
          View all
        </Link>
      </div>

      {recent.length === 0 ? (
        <div className="text-white-50 py-4 text-center">
          You have no orders yet.
        </div>
      ) : (
        <Table responsive hover borderless className="mb-0 table-transparent">
          <thead>
            <tr>
              <th>Order</th>
              <th>Date</th>
              <th className="text-center">Items</th>
              <th>Total</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {recent.map((o) => (
              <tr key={o._id}>
                <td>#{String(o._id).slice(-6)}</td>
                <td>{fmtDate(o.createdAt)}</td>
                <td className="text-center">{o.items?.length ?? 0}</td>
                <td>${Number(o.total || 0).toFixed(2)}</td>
                <td>
                  <Badge
                    bg={statusVariant(o.status)}
                    className="text-capitalize"
                  >
                    {o.status || "—"}
                  </Badge>
                </td>
                <td className="text-end">
                  <div className="d-flex justify-content-end gap-2">
                    <Link to="/orders" className="btn-ghost neo rounded-4">
                      Details
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default function CustomerDashboard() {
  const dispatch = useDispatch();
  const { customer } = useSelector((store) => store.customerStore);
  const storeOrders = useSelector(
    (store) => (store.orderStore && store.orderStore.orders) || []
  );
  const { products } = useSelector((store) => store.productStore);
  const [orders, setOrders] = useState(storeOrders || []);

  useEffect(() => {
    setOrders(storeOrders || []);
  }, [storeOrders]);

  useEffect(() => {
    if (!Array.isArray(products) || products.length === 0) {
      dispatch(fetchAllProductsAction());
    }
    (async () => {
      if (
        (!Array.isArray(storeOrders) || storeOrders.length === 0) &&
        customer?._id
      ) {
        const res = await retrieveAllOrder(customer._id);
        if (res?.status === "success" && Array.isArray(res.orders))
          setOrders(res.orders);
      } else {
        setOrders(storeOrders);
      }
    })();
  }, [dispatch, customer?._id]);

  const openOrders = orders.filter(
    (o) => String(o.status).toLowerCase() !== "delivered"
  );
  const deliveredOrders = orders.filter(
    (o) => String(o.status).toLowerCase() === "delivered"
  );
  const lastOrder =
    [...orders].sort(
      (a, b) => new Date(b?.createdAt || 0) - new Date(a?.createdAt || 0)
    )[0] || null;

  const recommendations = [...(products || [])]
    .sort((a, b) => getCreatedAt(b) - getCreatedAt(a))
    .slice(0, 8);

  const [recentlyViewed, setRecentlyViewed] = useState([]);
  useEffect(() => {
    try {
      const ids = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
      if (Array.isArray(ids) && ids.length && Array.isArray(products)) {
        const mapped = ids
          .map((id) =>
            products.find(
              (p) =>
                String(p._id) === String(id) || String(p.slug) === String(id)
            )
          )
          .filter(Boolean)
          .slice(0, 6);
        setRecentlyViewed(mapped);
      }
    } catch {
      setRecentlyViewed([]);
    }
  }, [products]);

  return (
    <section
      className="py-5"
      style={{
        background: "linear-gradient(180deg,var(--neo-d1),var(--neo-d2))",
      }}
    >
      <Container>
        {/* HERO */}
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
          <div className="d-flex align-items-center gap-3">
            <span className="rounded-circle bg-primary bg-opacity-10 p-3">
              <BsPersonCircle size={28} className="text-white" />
            </span>
            <div className="text-white">
              <h2 className="mb-0">Welcome, {customer?.fname}</h2>
              <small className="text-white-50">
                Track orders, manage your account, and discover picks for you.
              </small>
            </div>
          </div>
          <div className="d-flex flex-wrap gap-2">
            <Link
              to="/orders"
              className="btn-ghost neo rounded-4 text-decoration-none"
            >
              Order history
            </Link>
            <Link
              to="/manage-account"
              className="btn-ghost neo rounded-4 text-decoration-none"
            >
              Manage account
            </Link>
            <Link
              to="/products"
              className="btn-neo rounded-4 d-inline-flex align-items-center gap-2 text-decoration-none"
            >
              Shop now <BsArrowRight />
            </Link>
          </div>
        </div>

        {/* QUICK STATS */}
        <Row className="g-4 mb-4">
          <Col md={4}>
            <div className="card-neo rounded-4 h-100 p-3">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="small text-white">Open orders</div>
                  <div className="h3 m-0 text-white-50">
                    {openOrders.length}
                  </div>
                </div>
                <BsBoxSeam size={26} className="text-neo" />
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className="card-neo rounded-4 h-100 p-3">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="small text-white">Delivered</div>
                  <div className="h3 m-0 text-white-50">
                    {deliveredOrders.length}
                  </div>
                </div>
                <BsBoxSeam size={26} className="text-neo" />
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className="card-neo rounded-4 h-100 p-3">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="small text-white">Last order</div>
                  <div className="h5 m-0 text-white-50">
                    {lastOrder ? `#${String(lastOrder._id).slice(-6)}` : "—"}
                  </div>
                  <div className="small text-white-50">
                    {lastOrder ? fmtDate(lastOrder.createdAt) : "No orders yet"}
                  </div>
                </div>
                <BsBoxSeam size={26} className="text-neo" />
              </div>
            </div>
          </Col>
        </Row>

        {/* RECENT ORDERS */}
        <SectionRecentOrders orders={orders} />

        {/* RECENTLY VIEWED (optional personal row) */}
        <div className="card-neo rounded-4 p-4 my-4">
          <div className="d-flex justify-content-between align-items-center mb-2 text-white">
            <h5 className="m-0">Recently viewed</h5>
            <Link to="/products" className="btn btn-ghost neo rounded-4">
              Browse more
            </Link>
          </div>
          {recentlyViewed.length === 0 ? (
            <div className="text-white-50">
              You have not viewed any items recently.
            </div>
          ) : (
            <Row className="g-3 align-items-stretch">
              {recentlyViewed.map((p) => (
                <Col xs={12} sm={6} lg={4} key={p._id}>
                  <div className="card-neo rounded-4 h-100 overflow-hidden d-flex">
                    <div
                      className="flex-shrink-0"
                      style={{
                        width: 120,
                        background: "rgba(255,255,255,.06)",
                      }}
                    >
                      <img
                        src={
                          p.images ||
                          p.image ||
                          "https://via.placeholder.com/120x90?text=Product"
                        }
                        alt={p.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    </div>
                    <div className="p-3 d-flex flex-column flex-grow-1">
                      <div className="fw-semibold">{p.name}</div>
                      <div className="small text-white-50 line-clamp-2 mb-2">
                        {p.description}
                      </div>
                      <div className="d-flex justify-content-between align-items-center mt-auto">
                        <div className="h6 m-0">
                          ${Number(p.price || 0).toFixed(2)}
                        </div>
                        <div className="d-flex gap-2">
                          <Link
                            to={`/product/${p.slug || p._id}`}
                            className="btn-ghost neo rounded-4"
                          >
                            View
                          </Link>
                          <Button
                            as={Link}
                            to={`/cart?add=${p._id}`}
                            bsPrefix="neo"
                            className="btn-neo rounded-4 d-inline-flex align-items-center"
                          >
                            <BsCartPlus /> Add
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          )}
        </div>

        {/* RECOMMENDATIONS */}
        <SectionRecs products={recommendations} />

        {/* SUPPORT STRIP */}
        <div className="card-neo rounded-4 p-4 mt-4">
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
            <div className="d-flex flex-column text-white">
              <div className="h5 m-0">Need help with an order?</div>
              <div className="text-white-50 small">
                We’re here to help with delivery updates, returns and more.
              </div>
            </div>
            <Link to="/support" className="btn btn-ghost neo rounded-4">
              Contact support
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
