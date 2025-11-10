import { useLocation, useNavigate } from "react-router-dom";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";

const ThankYou = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    // Retrieve order details passed via navigation state (if any)
    if (location.state?.order) {
      setOrderDetails(location.state.order);
    } else {
      // fallback: redirect if accessed directly
      navigate("/");
    }
  }, [location, navigate]);

  if (!orderDetails) return null;

  const { customer, orderItems, total, date } = orderDetails;

  return (
    <div className="hero-wrap text-light min-vh-100 d-flex flex-column">
      <Container
        className="d-flex flex-column align-items-center justify-content-center py-5"
        style={{ minHeight: "80vh" }}
      >
        <Card
          className="p-4 shadow-lg rounded-4 text-center"
          // style={{ maxWidth: "650px" }}
        >
          <div className="mb-4 text-success">
            <CheckCircle size={70} strokeWidth={1.5} />
          </div>

          <h2 className="fw-bold mb-2">Thank You, {customer.name}</h2>
          <p className="text-muted mb-4">
            Your order has been successfully placed and is being processed.
          </p>
          <Row>
            {/* Order Summary */}
            <Col>
              <div className="border rounded-4 p-3 mb-4 bg-light">
                <h5 className="text-start mb-3">Order Summary</h5>
                <Row>
                  <Col xs={6} className="text-start">
                    <p className="mb-1">
                      <strong>Name:</strong> {customer.name}
                    </p>
                    <p className="mb-1">
                      <strong>Email:</strong> {customer.email}
                    </p>
                    <p className="mb-1">
                      <strong>Address:</strong> {customer.address}
                    </p>
                  </Col>
                  <Col xs={6} className="text-end">
                    <p className="mb-1">
                      <strong>Date:</strong>{" "}
                      {new Date(date).toLocaleDateString()}
                    </p>
                    <p className="mb-1">
                      <strong>Time:</strong>{" "}
                      {new Date(date).toLocaleTimeString()}
                    </p>
                    <p className="mb-1">
                      <strong>Total:</strong> ${total.toFixed(2)}
                    </p>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col>
              {/* Order Items */}
              <div className="border rounded-4 p-3 mb-4 bg-white">
                <h5 className="text-start mb-3">Items Ordered</h5>
                {orderItems.map((item, index) => (
                  <div
                    key={index}
                    className="d-flex justify-content-between mb-2 border-bottom pb-1"
                  >
                    <span
                      className="text-truncate me-2"
                      style={{ maxWidth: "70%" }}
                    >
                      {item.name} × {item.quantity}
                    </span>
                    <span className="flex-shrink-0">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </Col>
          </Row>

          <Button
            onClick={() => navigate("/")}
            className="btn-neo rounded-4 px-4 py-2 w-25 mx-auto"
          >
            Go to Homepage
          </Button>
        </Card>
      </Container>
    </div>
  );
};

export default ThankYou;
