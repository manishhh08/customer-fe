import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark text-light border-top border-secondary">
      <div className="container py-5">
        <div className="row gy-4">
          {/* Brand + blurb */}
          <div className="col-12 col-md-4">
            <h5 className="fw-bold">ShopMate</h5>
            <p className="text-secondary mb-3">
              Your everyday marketplace for fashion, gadgets, and home
              essentials. Fast shipping, easy returns, and secure checkout.
            </p>

            {/* “Socials” as buttons (no extra icon libs required) */}
            <div className="d-flex flex-wrap gap-2">
              <a
                className="btn btn-outline-light btn-sm"
                href="#"
                aria-label="Visit our Facebook"
              >
                Facebook
              </a>
              <a
                className="btn btn-outline-light btn-sm"
                href="#"
                aria-label="Visit our Instagram"
              >
                Instagram
              </a>
              <a
                className="btn btn-outline-light btn-sm"
                href="#"
                aria-label="Visit our TikTok"
              >
                TikTok
              </a>
              <a
                className="btn btn-outline-light btn-sm"
                href="#"
                aria-label="Visit our YouTube"
              >
                YouTube
              </a>
            </div>
          </div>

          {/* Shop links */}
          <div className="col-6 col-md-2">
            <h6 className="text-uppercase fw-semibold mb-3">Shop</h6>
            <ul className="list-unstyled">
              <li>
                <a className="link-light link-underline-opacity-0" href="#">
                  New Arrivals
                </a>
              </li>
              <li>
                <a className="link-light link-underline-opacity-0" href="#">
                  Best Sellers
                </a>
              </li>
              <li>
                <a className="link-light link-underline-opacity-0" href="#">
                  Deals
                </a>
              </li>
              <li>
                <a className="link-light link-underline-opacity-0" href="#">
                  Gift Cards
                </a>
              </li>
            </ul>
          </div>

          {/* Help links */}
          <div className="col-6 col-md-3">
            <h6 className="text-uppercase fw-semibold mb-3">Help</h6>
            <ul className="list-unstyled">
              <li>
                <a className="link-light link-underline-opacity-0" href="#">
                  Track Order
                </a>
              </li>
              <li>
                <a className="link-light link-underline-opacity-0" href="#">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a className="link-light link-underline-opacity-0" href="#">
                  Size Guide
                </a>
              </li>
              <li>
                <a className="link-light link-underline-opacity-0" href="#">
                  Contact Support
                </a>
              </li>
              <li>
                <a className="link-light link-underline-opacity-0" href="#">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-12 col-md-3">
            <h6 className="text-uppercase fw-semibold mb-3">Get updates</h6>
            <form className="needs-validation" noValidate>
              <label htmlFor="footerEmail" className="form-label">
                Subscribe to our newsletter
              </label>
              <div className="input-group">
                <input
                  id="footerEmail"
                  type="email"
                  className="form-control"
                  placeholder="you@example.com"
                  aria-label="Email address"
                  required
                />
                <button className="btn btn-primary" type="submit">
                  Subscribe
                </button>
              </div>
              <small className="text-secondary d-block mt-2">
                By subscribing, you agree to our{" "}
                <a className="link-light" href="#">
                  Privacy Policy
                </a>
                .
              </small>
            </form>
          </div>
        </div>

        <hr className="border-secondary my-4" />

        {/* Bottom strip */}
        <div className="row align-items-center gy-3">
          <div className="col-12 col-md-12 text-center">
            <ul className="list-inline mb-0 small">
              <li className="list-inline-item">
                <a className="link-secondary link-underline-opacity-0" href="#">
                  Terms
                </a>
              </li>
              <li className="list-inline-item">•</li>
              <li className="list-inline-item">
                <a className="link-secondary link-underline-opacity-0" href="#">
                  Privacy
                </a>
              </li>
              <li className="list-inline-item">•</li>
              <li className="list-inline-item">
                <a className="link-secondary link-underline-opacity-0" href="#">
                  Cookies
                </a>
              </li>
              <li className="list-inline-item">•</li>
              <li className="list-inline-item">
                <a className="link-secondary link-underline-opacity-0" href="#">
                  Accessibility
                </a>
              </li>
            </ul>
            <div className="text-secondary small mt-2">
              © {year} ShopMate Pty Ltd. All rights reserved.
            </div>
          </div>
        </div>

        {/* Back to top */}
        <div className="text-center mt-4">
          <a
            href="#"
            className="btn btn-outline-secondary btn-sm"
            aria-label="Back to top"
          >
            ↑ Back to top
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
