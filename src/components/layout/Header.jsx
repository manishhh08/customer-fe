import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import brandName from "../../assets/logo.png";
import { logoutAction } from "../../features/customer/customerAction";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { customer } = useSelector((store) => store.customerStore);

  const handleLogout = () => {
    dispatch(logoutAction());
    navigate("/", { replace: true, state: {} });
  };

  return (
    <Navbar expand="lg" bg="dark" variant="dark" className="py-2">
      <Container
        fluid
        className="d-flex justify-content-between align-items-center mx-3"
      >
        <Navbar.Brand as={Link} to="/" className="m-0 p-0">
          <img src={brandName} alt="Brand Logo" style={{ height: "40px" }} />
        </Navbar.Brand>

        <Nav className="d-flex gap-3 align-items-center">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>

          {customer && customer._id ? (
            <>
              <Nav.Link as={Link} to="/dashboard">
                Dashboard
              </Nav.Link>
              <Button variant="primary" size="sm" onClick={handleLogout}>
                Logout
              </Button>
              <Nav.Link as={Link} to="/cart">
                <FaShoppingCart />
              </Nav.Link>
            </>
          ) : (
            <>
              <Button
                as={Link}
                to="/auth?tab=login"
                variant="primary"
                size="sm"
              >
                Login
              </Button>
              <Nav.Link as={Link} to="/cart">
                <FaShoppingCart />
              </Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
