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

  const [loading, setLoading] = useState(false);

  const { form, handleOnChange, setForm } = useForm({
    email: "",
    password: "",
  });

  let inputFields = [
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
      console.log("response:", data);
      toast[data.status](data.message);

      if (data.status === "success") {
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const { customer } = useSelector((store) => store.customerStore);
  let previousLocation = location.state?.from?.pathname || "/dashboard";

  useEffect(() => {
    customer?._id && navigate(previousLocation);
  }, [customer?._id]);

  return (
    <Form onSubmit={handleOnSubmit}>
      {inputFields.map((item, index) => {
        return <CustomInput key={index} {...item} onChange={handleOnChange} />;
      })}

      <Button
        variant="primary"
        type="submit"
        className="mb-2 pt-2 w-25 mx-auto d-block "
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </Button>
    </Form>
  );
};

export default LoginForm;
