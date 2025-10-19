import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CustomInput } from "./custominput/CustomInput";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import useForm from "../hooks/useForm";
import { loginCustomerAction } from "../features/customer/customerAction";

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
    </Form>
  );
};

export default LoginForm;
