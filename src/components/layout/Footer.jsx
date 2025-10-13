import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark text-light ">
      <div className="container py-3">
        <div className="row gy-3">
          {/* Brand + blurb */}
          <div className="col-12 col-md-4">
            <h5 className="fw-bold">ShopMate</h5>
            <p className="text-secondary mb-2">
              Your everyday marketplace for fashion, gadgets, and home
              essentials. Fast shipping, easy returns, and secure checkout.
            </p>

            {/* Social buttons */}
            <div className="d-flex flex-wrap gap-2">
              <a className="btn btn-outline-light btn-sm" href="#">
                Facebook
              </a>
              <a className="btn btn-outline-light btn-sm" href="#">
                Instagram
              </a>
              <a className="btn btn-outline-light btn-sm" href="#">
                TikTok
              </a>
              <a className="btn btn-outline-light btn-sm" href="#">
                YouTube
              </a>
            </div>
          </div>

          {/* Shop links */}
          <div className="col-6 col-md-2">
            <h6 className="text-uppercase fw-semibold mb-2">Shop</h6>
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
            <h6 className="text-uppercase fw-semibold mb-2">Help</h6>
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
              © {year} ShopMate Pty Ltd. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
