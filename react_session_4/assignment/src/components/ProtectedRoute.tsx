import type { Role } from "../types";
import { useAuthContext } from "./AuthProvider";
import { useLocation, Outlet, Navigate } from "react-router-dom";

type Props = {
  allowedRoles?: Role[];
};

const ProtectedRoute = ({ allowedRoles = ["USER"] }: Props) => {
  const location = useLocation();
  const { role, isLoggdin } = useAuthContext();

  if (!isLoggdin) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(role)) {
    console.log(role)
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
