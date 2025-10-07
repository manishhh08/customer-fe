import { useNavigate } from "react-router-dom";

import { CustomInput } from "./custominput/CustomInput";
import useForm from "../hooks/useForm";
import { Button, Form, Row, Col, InputGroup } from "react-bootstrap";
import { createCustomer } from "../features/customer/customerAPI";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

const SignupForm = () => {
  const navigate = useNavigate();
  let initialState = {
    fname: "",
    lname: "",
    email: "",
    password: "",
    cpassword: "",
    phone: "",
  };

  const { form, handleOnChange } = useForm(initialState);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.cpassword) {
      toast.error("Passwords do not match!", {
        position: "top-right",
        theme: "dark",
      });
      return;
    }
    setLoading(true);
    try {
      let data = await createCustomer(form);
      if (data.status) {
        toast[data.status](data.message);
        navigate("/auth?tab=login");
      }
    } catch (err) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleOnSubmit}>
      <Row>
        <Col>
          <Form.Group className="mb-3 d-flex flex-column" controlId="fname">
            <Form.Label className="fw-bold text-start">First Name</Form.Label>
            <Form.Control
              type="text"
              name="fname"
              placeholder="Enter First Name"
              value={form.fname}
              onChange={handleOnChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3 d-flex flex-column" controlId="lname">
            <Form.Label className="fw-bold text-start">Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lname"
              placeholder="Enter Last Name"
              value={form.lname}
              onChange={handleOnChange}
            />
          </Form.Group>
        </Col>
      </Row>

      {/* Email */}
      <Form.Group className="mb-3 d-flex flex-column" controlId="signup-email">
        <Form.Label className="fw-bold text-start">Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleOnChange}
        />
      </Form.Group>
      {/* phone field */}
      <Form.Group className="mb-3 d-flex flex-column" controlId="phone">
        <Form.Label className="fw-bold text-start">Phone Number</Form.Label>
        <Form.Control
          type="text"
          name="phone"
          placeholder="Enter phone number"
          value={form.phone}
          onChange={handleOnChange}
        />
      </Form.Group>
      {/* Password */}
      <Form.Group
        className="mb-3 d-flex flex-column"
        controlId="signup-password"
      >
        <Form.Label className="fw-bold text-start">Password</Form.Label>

        <InputGroup>
          <Form.Control
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter Password"
            value={form.password}
            onChange={handleOnChange}
          />
          <Button
            variant="outline-secondary"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </Button>
        </InputGroup>
      </Form.Group>

      {/* Confirm Password */}
      <Form.Group className="mb-3 d-flex flex-column" controlId="cpassword">
        <Form.Label className="fw-bold text-start">Confirm Password</Form.Label>

        <InputGroup>
          <Form.Control
            type={showConfirmPassword ? "text" : "password"}
            name="cpassword"
            placeholder="Enter Password"
            value={form.cpassword}
            onChange={handleOnChange}
          />
          <Button
            variant="outline-secondary"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            tabIndex={-1}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </Button>
        </InputGroup>
      </Form.Group>

      <Button
        variant="primary"
        type="submit"
        className="mb-2 pt-2 w-100"
        disabled={loading}
      >
        {loading ? "Signing up...." : "Sign Up"}
      </Button>
    </Form>
  );
};

export default SignupForm;
