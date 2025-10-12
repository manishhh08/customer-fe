import { useState } from "react";
import { Button, Card, Row, Col, Container, Image } from "react-bootstrap";
import { Plus, Minus, Trash2, ShoppingCart } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import {
  decreaseItemQuantityAction,
  increaseItemQuantityAction,
  removeFromCartAction,
} from "../features/cart/cartActions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const Cart = () => {
  // const [cartItems, setCartItems] = useState([
  //   {
  //     id: 1,
  //     name: "Wireless Headphones",
  //     price: 89.99,
  //     quantity: 1,
  //     image:
  //       "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
  //   },
  //   {
  //     id: 2,
  //     name: "Smart Watch",
  //     price: 249.99,
  //     quantity: 1,
  //     image:
  //       "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop",
  //   },
  //   {
  //     id: 3,
  //     name: "Phone Case",
  //     price: 19.99,
  //     quantity: 2,
  //     image:
  //       "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=200&h=200&fit=crop",
  //   },
  // ]);
  const [cart, setCart] = useState([]);

  const { cartItems, total } = useSelector((state) => state.cartStore);
  const dispatch = useDispatch();

  const updateQuantity = (item, change) => {
    if (change === "increase") {
      dispatch(increaseItemQuantityAction(item));
    } else {
      dispatch(decreaseItemQuantityAction(item));
    }
  };

  const removeItem = (item) => {
    dispatch(removeFromCartAction(item));
    toast.info("Item removed from cart");
  };

  const handleCheckout = () => {
    toast.success("Proceeding to checkout...");
  };

  if (cart.length === 0) {
    return (
      <Container className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
        <ShoppingCart size={64} className="text-secondary mb-3" />
        <h2>Your cart is empty</h2>
        <p className="text-muted">Add some items to get started!</p>
      </Container>
    );
  }

  useEffect(() => {
    setCart(cartItems);
  }, [cartItems]);

  return (
    <Container className="py-5">
      <h1 className="mb-4 fw-bold">Shopping Cart</h1>
      <Row>
        {/* Cart Items */}
        <Col lg={8}>
          {cart?.map((product) => (
            <Card key={product.item._id} className="mb-3 shadow-sm">
              <Card.Body>
                <Row className="align-items-center">
                  <Col xs={3} md={2}>
                    <Image
                      src={product.item.image}
                      alt={product.item.name}
                      fluid
                      rounded
                      className="border"
                    />
                  </Col>

                  <Col xs={9} md={6}>
                    <h5 className="mb-1">{product.item.name}</h5>
                    <p className="text-muted mb-2">
                      ${product.item.price.toFixed(2)}
                    </p>

                    <div className="d-flex align-items-center gap-2">
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => updateQuantity(product.item, "decrease")}
                      >
                        <Minus size={14} />
                      </Button>
                      <span className="px-2">{product.quantity}</span>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => updateQuantity(product.item, "increase")}
                      >
                        <Plus size={14} />
                      </Button>

                      <Button
                        variant="outline-danger"
                        size="sm"
                        className="ms-auto"
                        onClick={() => removeItem(product.item)}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </Col>

                  <Col xs={12} md={4} className="text-md-end mt-3 mt-md-0">
                    <h5 className="fw-semibold mb-0">
                      ${(product.item.price * product.quantity).toFixed(2)}
                    </h5>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
        </Col>

        {/* Order Summary */}
        <Col lg={4}>
          <Card className="shadow-sm sticky-top" style={{ top: "2rem" }}>
            <Card.Body>
              <h4 className="mb-4">Order Summary</h4>
              <div className="d-flex justify-content-between text-muted mb-2">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between text-muted mb-2">
                <span>Tax (10%)</span>
                <span>${((total / 100) * 10).toFixed(2)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold mb-4">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <Button
                variant="primary"
                className="w-100"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
