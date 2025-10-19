import { useEffect, useState } from "react";
import {
  Accordion,
  Card,
  Badge,
  Spinner,
  Alert,
  Button,
  Container,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { retrieveAllOrder } from "../features/order/orderAPI";
import { BsCartX } from "react-icons/bs";
import { Link } from "react-router-dom";

const Order = () => {
  const { customer } = useSelector((store) => store.customerStore);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeKey, setActiveKey] = useState("0");

  const toggleAccordion = (key) => {
    setActiveKey(activeKey === key ? null : key);
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case "delivered":
        return "success";
      case "in-transit":
        return "info";
      case "processing":
        return "warning";
      default:
        return "secondary";
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      if (!customer?._id) return;
      try {
        setLoading(true);
        const { status, orders } = await retrieveAllOrder(customer._id);
        if (status === "success") {
          setOrders(orders);
        } else {
          setError("Failed to load orders");
        }
      } catch (err) {
        setError(err.message || "Internal Server Error");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [customer]);

  if (loading)
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );

  if (error) return <Alert variant="danger">{error}</Alert>;

  if (orders.length === 0) {
    return (
      <div
        className="d-flex flex-column justify-content-center align-items-center text-center"
        style={{ minHeight: "80vh" }}
      >
        <BsCartX size={80} className="text-muted mb-3" />
        <h3 className="text-secondary fw-light mb-2">No orders found</h3>
        <p className="text-muted mb-4">
          Looks like you haven’t placed any orders yet.
        </p>
        <Link
          to="/products"
          variant="primary"
          className="rounded-pill px-4 py-2 shadow-sm"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <Container className="container py-5">
      <h2 className="mb-4">Order History</h2>
      <Accordion activeKey={activeKey}>
        {orders.map((order, index) => (
          <Card key={order._id} className="mb-3 shadow-sm border-0">
            <Accordion.Item eventKey={index.toString()}>
              <Accordion.Header
                onClick={() => toggleAccordion(index.toString())}
              >
                <div className="d-flex justify-content-between w-100 align-items-center">
                  <div>
                    <strong>Order #{order._id.slice(-6)}</strong> —{" "}
                    {new Date(order.createdAt).toLocaleDateString()}
                  </div>
                  <div>
                    <strong>${order.total?.toFixed(2)}</strong>
                    <Badge
                      bg={getStatusVariant(order.status)}
                      className="me-2 text-capitalize"
                    >
                      {order.status}
                    </Badge>
                  </div>
                </div>
              </Accordion.Header>

              <Accordion.Body>
                {/* Order Items */}
                <h6>Items Ordered</h6>
                <ul className="mb-3">
                  {order.items?.map((item, idx) => (
                    <li key={idx}>
                      {item.productName} × {item.quantity} — $
                      {item.price?.toFixed(2)}
                    </li>
                  ))}
                </ul>

                {/* Shipping */}
                <h6>Shipping Address</h6>
                <p className="mb-3">{order.shippingAddress || "N/A"}</p>

                {/* Payment */}
                <h5>Payment Details</h5>
                <p>
                  Method: {order.paymentMethod || "Card"} <br />
                  Total: <strong>${order.total?.toFixed(2)}</strong>
                </p>

                {/* Action Buttons */}
                <div className="d-flex gap-2 mt-3">
                  <Button variant="primary" size="sm">
                    Track Order
                  </Button>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Card>
        ))}
      </Accordion>
    </Container>
  );
};

export default Order;
