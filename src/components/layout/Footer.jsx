import React from "react";
import { Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (id) => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
    } else {
      const redirect = document.getElementById(id);
      if (redirect) redirect.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <footer className="bg-dark text-light py-5 ">
      <div className="container">
        <div className="row gy-3 d-flex flex-row justify-content-between">
          {/* Brand + blurb */}
          <div className="col-12 col-md-4">
            <h5 className="fw-bold">Electra Hub</h5>
            <p className="text-secondary mb-2">
              Your Hub for All Things Electric.
            </p>
          </div>

          {/* Shop links */}
          <div className="col-6 col-md-2">
            <h6 className="text-uppercase fw-semibold mb-2">Shop</h6>
            <ul className="list-unstyled">
              <li>
                <Link
                  className="btn btn-link link-light link-underline-opacity-0 p-0"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("new-arrivals");
                  }}
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  className="btn btn-link link-light link-underline-opacity-0 p-0"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("best-sellers");
                  }}
                >
                  Best Sellers
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-12 col-md-3">
            <h6 className="text-uppercase fw-semibold mb-2">Get updates</h6>
            <form className="needs-validation" noValidate>
              <label htmlFor="footerEmail" className="form-label small">
                Subscribe to our newsletter
              </label>
              <div className="input-group mb-2">
                <input
                  id="footerEmail"
                  type="email"
                  className="form-control form-control-sm"
                  placeholder="you@example.com"
                  aria-label="Email address"
                  required
                />
                <button className="btn btn-primary btn-sm" type="submit">
                  Subscribe
                </button>
              </div>
              <small className="text-secondary d-block">
                By subscribing, you agree to our{" "}
                <a className="link-light" href="#">
                  Privacy Policy
                </a>
                .
              </small>
            </form>
          </div>
        </div>

        <hr className="border-secondary my-3" />

        {/* Bottom strip */}
        <div className="row">
          <div className="col-12 text-center">
            <div className="text-secondary small">
              © {year} Electra Hub Pty Ltd. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
