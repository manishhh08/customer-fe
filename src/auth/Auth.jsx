import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const Auth = ({ children }) => {
  const location = useLocation();
  const { customer } = useSelector((store) => store.customerStore);

  return (
    <>
      {customer && customer?._id ? (
        children
      ) : (
        //navigate to login
        <Navigate to="/" replace state={{ from: location }} />
      )}
    </>
  );
};

export default Auth;
