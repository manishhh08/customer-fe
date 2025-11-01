import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CustomInput } from "./custominput/CustomInput";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import useForm from "../hooks/useForm";
import { loginCustomerAction } from "../features/customer/customerAction";
import { apiProcessor } from "../utils/axiosHelper";
const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { customer } = useSelector((store) => store.customerStore);

  const [loading, setLoading] = useState(false);

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
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
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

  const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
      e.preventDefault();

      const response = await apiProcessor({
        method: "POST",
        url: "http://localhost:4001/api/auth/forgot-password",
        data: { email },
        isPrivate: false,
      });

      setMessage(response.message);
    };

    return <div></div>;
  };

  return (
    <Form onSubmit={handleOnSubmit}>
      {inputFields.map((item, index) => (
        <CustomInput key={index} {...item} onChange={handleOnChange} />
      ))}
      <Button
        bsPrefix="neo"
        type="submit"
        className="btn-neo rounded-4 mb-2 pt-2 w-100 d-block"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </Button>
      <h2>Forgot Password</h2>
      <form onSubmit={handleOnsubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
      {message && <p>{message}</p>}
    </Form>
  );
};

export default LoginForm;
