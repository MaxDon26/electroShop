import { useSelector } from "react-redux";
import { getUserRole } from "../../store/auth";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const role = useSelector(getUserRole());

  return <>{role === "admin" ? <Outlet /> : <Navigate to="/" />}</>;
};

export default ProtectedRoute;
