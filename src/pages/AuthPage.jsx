import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, Row, Col, Tab, Nav, Card } from "react-bootstrap";
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
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100" style={{ maxWidth: "500px" }}>
        <Col>
          <Card className="shadow-lg rounded-4 border-0">
            <Card.Body className="p-4">
              <h3 className="text-center mb-4 fw-bold">Welcome</h3>

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
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AuthPage;
