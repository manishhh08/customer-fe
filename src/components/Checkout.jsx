// src/pages/Checkout.jsx
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { setPurchases } from "../features/purchase/purchaseSlice";
import { clearCart } from "../features/cart/cartSlice";
import { useState } from "react";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: cartItems } = useSelector((state) => state.cartStore);

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    paymentMethod: "credit",
  });

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.address) {
      toast.error("Please fill in all fields");
      return;
    }

    // Save to purchases slice
    dispatch(
      setPurchases({
        customer: form,
        orderItems: cartItems,
        total,
        date: new Date().toISOString(),
      })
    );

    // Clear the cart
    dispatch(clearCart());

    toast.success("Order placed successfully!");
    navigate("/thank-you");
  };

  if (cartItems.length === 0) {
    return (
      <Container className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
        <h2>Your cart is empty</h2>
        <p className="text-muted">Add items before proceeding to checkout.</p>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h1 className="fw-bold mb-4">Checkout</h1>
      <Row>
        {/* Billing Details */}
        <Col lg={8}>
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <h4 className="mb-4">Billing Details</h4>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Enter your shipping address"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Payment Method</Form.Label>
                  <Form.Select
                    name="paymentMethod"
                    value={form.paymentMethod}
                    onChange={handleChange}
                  >
                    <option value="credit">Credit Card</option>
                    <option value="paypal">PayPal</option>
                    <option value="cash">Cash on Delivery</option>
                  </Form.Select>
                </Form.Group>

                <Button type="submit" variant="primary" className="w-100 mt-3">
                  Confirm Order
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Order Summary */}
        <Col lg={4}>
          <Card className="shadow-sm sticky-top" style={{ top: "2rem" }}>
            <Card.Body>
              <h4 className="mb-4">Order Summary</h4>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="d-flex justify-content-between mb-2"
                >
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <hr />
              <div className="d-flex justify-content-between text-muted mb-2">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between text-muted mb-2">
                <span>Tax (10%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold mb-4">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
