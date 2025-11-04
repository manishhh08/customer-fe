import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { resetPassword } from "../features/customer/customerAPI";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const response = await resetPassword({ email, token, newPassword });
      toast.success(response.message);
      navigate("/auth");
    } catch (error) {
      toast.error(error.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Reset Your Password</h2>
      <Form
        onSubmit={handleSubmit}
        className="mx-auto shadow p-4 rounded-4"
        style={{ maxWidth: "400px" }}
      >
        <Form.Group className="mb-3">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Confirm New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button
          type="submit"
          className="btn-neo rounded-4 mb-2 py-2 w-100 text-center"
          disabled={loading}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </Button>
      </Form>
    </div>
  );
};

export default ResetPassword;
