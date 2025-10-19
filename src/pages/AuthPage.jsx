import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

const AuthPage = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("login");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tab = searchParams.get("tab") || "login";
    setActiveTab(tab);
  }, [location]);

  return (
    <div
      style={{
        background: "linear-gradient(180deg, var(--neo-d1), var(--neo-d2))",
      }}
    >
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Row className="w-100">
          <Col md={6} lg={5} className="mx-auto">
            <div className="shadow-lg border-0">
              <div className="card-neo rounded-4 p-4">
                <h3
                  className="text-center mb-4 fw-bold"
                  style={{
                    background:
                      "linear-gradient(90deg, var(--neo-start), var(--neo-end))",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Welcome Back!
                </h3>

                <Tab.Container
                  activeKey={activeTab}
                  onSelect={(k) => setActiveTab(k)}
                >
                  <Nav variant="tabs" className="justify-content-center mb-3">
                    <Nav.Item>
                      <Nav.Link
                        eventKey="login"
                        className={`fw-bold fs-5 ${
                          activeTab === "login"
                            ? "text-primary"
                            : "text-secondary"
                        }`}
                      >
                        Login
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="signup"
                        className={`fw-bold fs-5 ${
                          activeTab === "signup"
                            ? "text-primary"
                            : "text-secondary"
                        }`}
                      >
                        Signup
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>

                  <Tab.Content>
                    <Tab.Pane eventKey="login">
                      <LoginForm />
                    </Tab.Pane>
                    <Tab.Pane eventKey="signup">
                      <SignupForm />
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AuthPage;
