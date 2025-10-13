import {
  Badge,
  Button,
  Container,
  Nav,
  Navbar,
  Dropdown,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaBars, FaUserCircle } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { MdHistory } from "react-icons/md";
import { FaUserGear } from "react-icons/fa6";
import { logoutAction } from "../../features/customer/customerAction";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Header = ({ toggleSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { customer } = useSelector((store) => store.customerStore);

 

  const { items } = useSelector((state) => state.cartStore);
  const [tempCart, setTempCart] = useState(0);
  useEffect(() => {
    const sum = items.reduce((sum, item) => sum + item.quantity, 0);
    setTempCart(sum);
  }, [items]);

  const handleLogout = () => {
    dispatch(logoutAction());
    toast.success("Logout succesful");
    navigate("/", { replace: true, state: {} });

  };

  return (
    <Navbar expand="lg" bg="dark" variant="dark" className="py-2">
      <Container
        fluid
        className="d-flex justify-content-between align-items-center mx-3"
      >

        <Navbar.Brand as={Link} to="/" className="m-0 p-0">
          <img
            src="/assets/favicon.ico"
            alt="Brand Logo"
            style={{ height: "40px" }}
          />
        </Navbar.Brand>

        <div className="d-flex align-items-center gap-4">
          <Button
            variant="link"
            className="text-white p-0"
            onClick={toggleSidebar}
          >
            <FaBars size={22} />
          </Button>

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
              <Nav.Link as={Link} to="/cart" className="position-relative">
                <FaShoppingCart size={20} />
                <Badge
                  bg="danger"
                  pill
                  className="position-absolute top-0 start-100 translate-middle"
                >
                  {tempCart}
                </Badge>


              <Dropdown align="end">
                <Dropdown.Toggle variant="link" className="text-white p-0">
                  <FaUserCircle size={22} />
                </Dropdown.Toggle>

                <Dropdown.Menu align="end" variant="dark">
                  <Dropdown.Item as={Link} to="/account">
                    <FaUserGear /> Manage Account
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/orders">
                    <MdHistory /> Order History
                  </Dropdown.Item>

                  <Dropdown.Item onClick={handleLogout}>
                    <TbLogout color="red" /> Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Nav.Link as={Link} to="/cart">
                <FaShoppingCart size={20} />
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
              <Nav.Link as={Link} to="/cart" className="position-relative">
                <FaShoppingCart size={20} />
                <Badge
                  bg="danger"
                  pill
                  className="position-absolute top-0 start-100 translate-middle"
                >
                  {tempCart}
                </Badge>
              </Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
