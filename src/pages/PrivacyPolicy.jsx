import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="container py-5 text-light">
      <div className="bg-dark rounded-4 p-5 shadow-lg">
        <h2 className="fw-bold mb-4 text-center">Privacy Policy</h2>
        <p className="text-secondary text-center mb-5">
          <strong>Effective Date:</strong> October 1, 2025
        </p>

        <p>
          At <strong>Electra Hub Pty Ltd</strong> , your privacy is important to
          us. This Privacy Policy explains how we collect, use, and protect your
          personal information when you visit our website, make a purchase, or
          interact with our services.
        </p>

        <hr className="border-secondary my-4" />

        <section className="mb-4">
          <h5 className="fw-semibold">1. Information We Collect</h5>
          <ul>
            <li>
              <strong>Personal details:</strong> Name, email address, phone
              number, and shipping/billing address.
            </li>
            <li>
              <strong>Account information:</strong> Login credentials,
              preferences, and saved items.
            </li>
            <li>
              <strong>Payment details:</strong> Processed securely by trusted
              payment providers (we do not store credit card numbers).
            </li>
            <li>
              <strong>Technical data:</strong> IP address, browser type, device
              information, and usage analytics.
            </li>
            <li>
              <strong>Communication data:</strong> Feedback, messages, and
              customer support interactions.
            </li>
          </ul>
        </section>

        <section className="mb-4">
          <h5 className="fw-semibold">2. How We Use Your Information</h5>
          <p>We use your information to:</p>
          <ul>
            <li>Process and deliver your orders.</li>
            <li>Communicate with you about orders, updates, and promotions.</li>
            <li>Improve our website, products, and customer experience.</li>
            <li>Comply with legal obligations and prevent fraud.</li>
          </ul>
          <p className="mb-0">
            We will never sell your personal data to third parties.
          </p>
        </section>

        <section className="mb-4">
          <h5 className="fw-semibold">3. Cookies & Tracking</h5>
          <p>
            Our website uses cookies and similar technologies to enhance your
            experience, analyze site traffic, and personalize content. You can
            disable cookies in your browser settings, but some parts of the site
            may not function properly.
          </p>
        </section>

        <section className="mb-4">
          <h5 className="fw-semibold">4. Sharing Your Information</h5>
          <p>We may share limited data with:</p>
          <ul>
            <li>
              Service providers who help us operate our business (e.g.,
              delivery, payments, hosting).
            </li>
            <li>
              Legal authorities if required by law or to protect our rights.
            </li>
          </ul>
          <p className="mb-0">
            All partners are required to keep your information secure and use it
            only for authorized purposes.
          </p>
        </section>

        <section className="mb-4">
          <h5 className="fw-semibold">5. Data Security</h5>
          <p>
            We use modern security measures, including encryption, firewalls,
            and secure servers, to protect your personal data against
            unauthorized access or disclosure.
          </p>
        </section>

        <section className="mb-4">
          <h5 className="fw-semibold">6. Your Rights</h5>
          <p>You have the right to:</p>
          <ul>
            <li>Access, correct, or delete your personal information.</li>
            <li>Withdraw consent to marketing communications.</li>
            <li>Request a copy of the data we hold about you.</li>
          </ul>
          <p className="mb-0">
            To exercise these rights, contact us at{" "}
            <a href="mailto:privacy@electrahub.com.au" className="link-light">
              privacy@electrahub.com.au
            </a>
            .
          </p>
        </section>

        <section className="mb-4">
          <h5 className="fw-semibold">7. Data Retention</h5>
          <p>
            We retain your personal data only as long as necessary to fulfill
            the purposes described in this policy or as required by law.
          </p>
        </section>

        <section className="mb-4">
          <h5 className="fw-semibold">8. Changes to This Policy</h5>
          <p>
            We may update this Privacy Policy from time to time. Any updates
            will be posted on this page with a new “Effective Date.”
          </p>
        </section>

        <section>
          <h5 className="fw-semibold">9. Contact Us</h5>
          <p>
            If you have questions or concerns about this Privacy Policy or how
            we handle your data, please contact:
          </p>
          <address className="mb-0">
            <strong>Electra Hub Pty Ltd</strong>
            <br />
            Email:{" "}
            <a href="mailto:privacy@electrahub.com.au" className="link-light">
              privacy@electrahub.com.au
            </a>
            <br />
          </address>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
