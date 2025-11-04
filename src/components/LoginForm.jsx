import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CustomInput } from "./custominput/CustomInput";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import useForm from "../hooks/useForm";
import { loginCustomerAction } from "../features/customer/customerAction";
import { forgotPassword } from "../features/customer/customerAPI";

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { customer } = useSelector((store) => store.customerStore);

  const [loading, setLoading] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showForgot, setShowForgot] = useState(false);

  const { form, handleOnChange } = useForm({ email: "", password: "" });

  const inputFields = [
    {
      id: "email",
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Enter your email",
      value: form.email,
    },
    {
      id: "password",
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "Enter your password",
      value: form.password,
    },
  ];

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await dispatch(loginCustomerAction(form));
      toast[data.status](data.message);
    } catch {
      toast.error("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setLoading(true);
    try {
      const response = await forgotPassword(forgotEmail);
      setMessage(response.message);
    } catch {
      setMessage("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  const redirectTo =
    location.state?.from ||
    new URLSearchParams(location.search).get("redirect") ||
    "/dashboard";

  useEffect(() => {
    if (customer?._id) {
      navigate(redirectTo, { replace: true });
    }
  }, [customer?._id, redirectTo, navigate]);

  return (
    <Form onSubmit={handleOnSubmit}>
      {!showForgot &&
        inputFields.map((item, index) => (
          <CustomInput key={index} {...item} onChange={handleOnChange} />
        ))}

      <div className="text-center mt-3">
        <Button
          variant="link"
          onClick={() => setShowForgot((prev) => !prev)}
          style={{
            color: "white",
          }}
        >
          {showForgot ? "Back to Login" : "Forgot Password?"}
        </Button>
      </div>
      {!showForgot && (
        <Button
          bsPrefix="neo"
          type="submit"
          className="btn-neo rounded-4 mb-2 pt-2 w-100 d-block"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      )}
      {showForgot && (
        <div className="forgot-password-section mt-3 mb-2">
          <Form.Group controlId="forgotPasswordEmail">
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Button
            type="button"
            variant="secondary"
            onClick={handleForgotPassword}
            className="btn-neo rounded-4 w-100 mt-4"
            disabled={loading}
          >
            {loading ? "Sending link..." : "Send Reset Link"}
          </Button>
          {message && <p className="mt-2 text-success">{message}</p>}
        </div>
      )}
    </Form>
  );
};

export default LoginForm;
