import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Badge,
  Spinner,
} from "react-bootstrap";

import { Link } from "react-router-dom";
import {
  getCustomerDetail,
  updateCustomerDetailAction,
} from "../../features/customer/customerAction";
import { retrieveAllOrder } from "../../features/order/orderAPI";

export default function Account() {
  const dispatch = useDispatch();
  const { customer, loading } = useSelector((store) => store.customerStore);

  // local editable fields
  const [form, setForm] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    image: "",
  });
  const [ordersCount, setOrdersCount] = useState(0);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!customer) dispatch(getCustomerDetail());
  }, [customer, dispatch]);

  useEffect(() => {
    if (customer) {
      setForm({
        fname: customer.fname || "",
        lname: customer.lname || "",
        email: customer.email || "",
        phone: customer.phone || "",
        image: customer.image || "",
      });
      // quick orders badge
      retrieveAllOrder(customer._id).then((res) => {
        if (res?.status === "success") setOrdersCount(res.orders?.length || 0);
      });
    }
  }, [customer]);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await dispatch(updateCustomerDetailAction(form)); // update + refresh store
    setSaving(false);
  };

  const memberSince = customer?.createdAt
    ? customer.createdAt.split?.("T")?.[0] ||
      new Date(customer.createdAt).toLocaleDateString()
    : "—";

  const updatedAt = customer.updatedAt
    ? customer.updatedAt.split?.("T")?.[0] ||
      new Date(customer.updatedAt).toLocaleDateString()
    : "—";

  if (loading && !customer) {
    return (
      <div className="d-grid place-items-center" style={{ minHeight: "70vh" }}>
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <section
      className="py-5 text-white h-100"
      style={{
        background: "linear-gradient(180deg,var(--neo-d1),var(--neo-d2))",
      }}
    >
      <Container>
        {/* Header */}
        <div className="d-flex flex-wrap align-items-center justify-content-between mb-4">
          <div>
            <h2 className="fw-bold m-0">My Account</h2>
            <small>
              Review recent orders, manage delivery options, and update your
              profile.
            </small>
          </div>
          <div className="d-flex align-items-center gap-2">
            <Link
              to="/orders"
              className="btn-ghost neo rounded-4 text-decoration-none"
            >
              Orders ({ordersCount})
            </Link>
          </div>
        </div>

        <Row className="g-4">
          {/* Profile card */}
          <Col md={7}>
            <div className="card-neo rounded-4 p-4 h-100">
              <h5 className="mb-3">Profile</h5>
              <Form onSubmit={onSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="fname">
                      <Form.Label>First name</Form.Label>
                      <Form.Control
                        name="fname"
                        value={form.fname}
                        onChange={onChange}
                        placeholder="First name"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="lname">
                      <Form.Label>Last name</Form.Label>
                      <Form.Control
                        name="lname"
                        value={form.lname}
                        onChange={onChange}
                        placeholder="Last name"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    name="email"
                    value={form.email}
                    disabled
                    readOnly
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="phone">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        name="phone"
                        value={form.phone}
                        onChange={onChange}
                        placeholder="e.g. 0400 000 000"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="image">
                      <Form.Label>Avatar (URL)</Form.Label>
                      <Form.Control
                        name="image"
                        value={form.image}
                        onChange={onChange}
                        placeholder="https://…"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Button
                  bsPrefix="neo"
                  type="submit"
                  className="btn-neo rounded-4"
                  disabled={saving}
                >
                  {saving ? "Saving…" : "Save changes"}
                </Button>
              </Form>
            </div>
          </Col>

          {/* Profile Card */}
          <Col md={5}>
            <div className="card-neo rounded-4 p-4 h-100 d-flex flex-column align-items-center text-center">
              <div
                className="rounded-circle mb-3"
                style={{
                  width: 120,
                  height: 120,
                  overflow: "hidden",
                  border: "1px solid var(--neo-border)",
                }}
              >
                <img
                  src={
                    form.image ||
                    "https://api.dicebear.com/9.x/identicon/svg?seed=user"
                  }
                  alt="avatar"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div className="h5 mb-3">
                {form.fname} {form.lname}
              </div>
              <Badge bg={customer?.isVerified ? "success" : "secondary"}>
                {customer?.isVerified ? "Verified" : "Unverified"}
              </Badge>
              <div className="text-white-50 my-3">{form.email}</div>
              <div className="small text-white-50">
                Member since: {memberSince}
              </div>
              <div className="small text-white-50">
                Last updated: {updatedAt}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
