import { Button, Card, Row, Col, Container, Image } from "react-bootstrap";
import { Plus, Minus, Trash2, ShoppingCart } from "lucide-react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const { items: cartItems } = useSelector((state) => state.cartStore);
  const { customer } = useSelector((state) => state.customerStore);
  const navigate = useNavigate();
  const handleQuantity = (id, change) => {
    dispatch(updateQuantity({ id, change }));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
    toast.info("Item removed from cart");
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handleCheckout = () => {
    if (!customer) {
      toast.info("Please login to continue to checkout");
      navigate("/auth?redirect=/checkout");
      return;
    }
    navigate("/checkout");
  };

  if (cartItems.length === 0) {
    return (
      <Container className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
        <ShoppingCart size={64} className="text-secondary mb-3" />
        <h2>Your cart is empty</h2>
        <p className="text-muted">Add some items to get started!</p>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h1 className="mb-4 fw-bold">Shopping Cart</h1>
      <Row>
        <Col lg={8}>
          {cartItems?.map((item) => (
            <Card key={item._id} className="mb-3 shadow-sm">
              <Card.Body>
                <Row className="align-items-center">
                  <Col xs={3} md={2}>
                    <Image src={item.images[0]} alt={item.name} fluid rounded />
                  </Col>

                  <Col xs={9} md={6}>
                    <h5>{item.name}</h5>
                    <p className="text-muted mb-2">${item.price.toFixed(2)}</p>

                    <div className="d-flex align-items-center gap-2">
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => handleQuantity(item._id, -1)}
                      >
                        <Minus size={14} />
                      </Button>
                      <span className="px-2">{item.quantity}</span>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => handleQuantity(item._id, 1)}
                      >
                        <Plus size={14} />
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        className="ms-auto"
                        onClick={() => handleRemove(item._id)}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </Col>

                  <Col xs={12} md={4} className="text-md-end mt-3 mt-md-0">
                    <h5>${(item.price * item.quantity).toFixed(2)}</h5>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
        </Col>

        <Col lg={4}>
          <Card className="shadow-sm sticky-top" style={{ top: "2rem" }}>
            <Card.Body>
              <h4>Order Summary</h4>
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

              <Button
                bsPrefix="neo"
                className="w-100 btn-neo rounded-4"
                onClick={handleCheckout}
              >
                {customer && customer._id
                  ? "Proceed to Checkout"
                  : "Login to Checkout"}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
