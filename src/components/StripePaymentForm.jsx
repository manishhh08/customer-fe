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

const StripePaymentForm = ({ total, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

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
      {/* <CardElement options={{ hidePostalCode: true }} /> */}
      <PaymentElement id="payment-element" />
      <Button
        type="submit"
        bsPrefix="as"
        className="w-100 mt-5 rounded-4 btn-neo"
        disabled={!stripe || loading}
      >
        {loading ? "Processing..." : "Pay Now"}
      </Button>
    </form>
    // <form onSubmit={handleSubmit}>
    //   <EmailInput
    //     email={email}
    //     setEmail={setEmail}
    //     error={emailError}
    //     setError={setEmailError}
    //   />
    //   <h4>Payment</h4>
    //   <PaymentElement id="payment-element" />
    //   <button disabled={isLoading} id="submit">
    //     {isLoading || checkoutState.type === "loading" ? (
    //       <div className="spinner"></div>
    //     ) : (
    //       `Pay ${checkoutState.checkout.total.total.amount} now`
    //     )}
    //   </button>
    //   {/* Show any error or success messages */}
    //   {message && <div id="payment-message">{message}</div>}
    // </form>
  );
};

export default StripePaymentForm;
