import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { verifyEmailAction } from "../../features/customer/customerAction";
import { useState } from "react";

const Verify = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get("token");
  const email = params.get("email");
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  useEffect(() => {
    const verifyUser = async () => {
      const result = await verifyEmailAction(token, email);
      if (result.status === "success") {
        setLoading(false);
        setVerified(true);
      }
    };
    verifyUser();
  }, []);

  return (
    <div>
      {loading
        ? "Please wait while we finish verifying your emmail"
        : verified
        ? "Your email has been verified"
        : "Your email could not be verified"}
    </div>
  );
};

export default Verify;
