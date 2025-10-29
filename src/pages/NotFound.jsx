import { FaGhost } from "react-icons/fa";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center text-center vh-100 hero-wrap text-light">
      <FaGhost size={100} className="text-warning mb-4" />

      <h1 className="display-1 fw-bold mb-3">404</h1>

      <h2 className="fw-semibold mb-3">Oops! Page Not Found</h2>

      <p className="text-secondary mb-4 w-75 w-md-50 fs-5">
        The page you are looking for doesn’t exist or has been moved. Try
        returning to the homepage.
      </p>

      <Link
        to="/"
        className="btn btn-warning btn-lg rounded-pill shadow btn-neo"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
