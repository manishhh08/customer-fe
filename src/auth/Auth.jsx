import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const Auth = ({ children }) => {
  const location = useLocation();
  const { customer, loading, isLoggingOut } = useSelector(
    (store) => store.customerStore
  );

  if (loading) return <div>Fetching your details...</div>;

  if (!customer?._id && !isLoggingOut) {
    toast.info("Please log in to continue", { toastId: "auth-toast" });

    return <Navigate to="/auth" replace state={{ from: location.pathname }} />;
  }

  return children;
};

export default Auth;
