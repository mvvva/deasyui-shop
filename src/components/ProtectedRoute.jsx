import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const userData = useSelector((store) => store.user.userData);

  if (!userData) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}
