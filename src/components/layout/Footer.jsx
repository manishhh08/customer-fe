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
    <footer className="bg-dark text-light pt-3 pb-5 ">
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
          <div className="col-12 col-md-4 text-center text-md-start">
            <h6 className="text-uppercase fw-semibold mb-3">Get Updates</h6>

            <form
              action="https://gmail.us15.list-manage.com/subscribe/post?u=71a640f48bb6d54e8d33b241f&amp;id=a01de5494d&amp;f_id=00e9c2e1f0"
              method="post"
              noValidate
            >
              <label
                htmlFor="footerEmail"
                className="form-label small d-block mb-2"
              >
                Subscribe to our newsletter
              </label>
              <div className="input-group mb-2">
                <input
                  type="email"
                  name="EMAIL"
                  className="form-control form-control-sm"
                  id="footerEmail"
                  placeholder="you@example.com"
                  required
                />
                <button type="submit" className="btn btn-primary btn-sm">
                  Subscribe
                </button>
              </div>
              <small className="text-secondary d-block">
                By subscribing, you agree to our{" "}
                <a href="/privacy-policy" className="link-light">
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
