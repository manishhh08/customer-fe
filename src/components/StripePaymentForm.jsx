import { useEffect, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { Button } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const StripePaymentForm = ({ total, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create payment intent when component mounts
    const createPaymentIntent = async () => {
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
      } catch (err) {
        toast.error("Failed to initialize payment");
      }
    };
    createPaymentIntent();
  }, [total]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setLoading(true);
    const cardElement = elements.getElement(CardElement);

    const { paymentIntent, error } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
        },
      }
    );

    setLoading(false);

    if (error) {
      toast.error(error.message);
    } else if (paymentIntent.status === "succeeded") {
      toast.success("Payment successful!");
      onPaymentSuccess(); // Trigger your checkout confirmation logic
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement options={{ hidePostalCode: true }} />
      <Button
        type="submit"
        bsPrefix="neo"
        className="w-100 btn-neo rounded-4"
        disabled={!stripe || loading}
      >
        {loading ? "Processing..." : "Pay Now"}
      </Button>
    </form>
  );
};

export default StripePaymentForm;
