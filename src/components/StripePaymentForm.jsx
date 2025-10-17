import { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  CardElement,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { Button } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { createNewOrderAction } from "../features/purchase/purchaseAction";
import { clearCart } from "../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const StripePaymentForm = ({ total, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const { customer } = useSelector((store) => store.customerStore);
  const dispatch = useDispatch();

  useEffect(() => {
    // Create payment intent when component mounts
    const paymentIntent = async () => {
      try {
        const { data } = await axios.post(
          `${
            import.meta.env.VITE_APP_API_URL
          }/api/v1/payment/create-payment-intent`,
          {
            amount: Math.round(total * 100), // Convert to cents
            currency: "aud",
          }
        );
        setClientSecret(data.clientSecret);
        console.log(data.clientSecret);
      } catch (err) {
        toast.error("Failed to initialize payment");
      }
    };
    paymentIntent();
  }, [total]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!customer?._id) {
      toast.error("Please login to place an order");
      setLoading(false);
      return;
    }
    if (!stripe || !elements || !clientSecret) return;

    setLoading(true);
    const cardElement = elements.getElement(CardElement);

    try {
      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: { card: cardElement },
        }
      );

      if (error) {
        toast.error(error.message);
        setLoading(false);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        toast.success("Payment successful!");

        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        if (cartItems.length === 0) {
          toast.info("Cart is empty");
          setLoading(false);
          return;
        }

        const orderObject = {
          customerId: customer._id,
          items: cartItems.map((item) => ({
            productId: item._id,
            productName: item.name,
            quantity: item.quantity,
            price: item.price,
          })),
          total: total,
          currency: "AUD",
          paymentIntentId: paymentIntent.id,
        };

        dispatch(createNewOrderAction(orderObject));

        dispatch(clearCart());
        localStorage.removeItem("cartItems");

        onPaymentSuccess();
      }
    } catch (err) {
      console.error(err);
      toast.error("Order creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement options={{ hidePostalCode: true }} />
      <Button
        type="submit"
        bsPrefix="as"
        className="w-100 mt-5 rounded-4 btn-neo"
        disabled={!stripe || loading}
      >
        {loading ? "Processing..." : "Pay Now"}
      </Button>
    </form>
  );
};

export default StripePaymentForm;
