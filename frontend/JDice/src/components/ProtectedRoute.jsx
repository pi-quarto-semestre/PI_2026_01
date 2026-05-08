import { Navigate, Outlet, useLocation } from "react-router-dom";
import { hasActiveSession } from "../../services/auth";

export default function ProtectedRoute() {
  const location = useLocation();

  if (!hasActiveSession()) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
