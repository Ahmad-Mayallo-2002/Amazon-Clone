import { Roles } from "@/enums/roles";
import { getPayload } from "@/utils/payloadCookie";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({
  currentRole,
}: {
  currentRole: Roles;
}) {
  const payload = getPayload();

  if (!payload) return <Navigate to="/auth/login" replace />;

  if (payload.token && payload.role === currentRole) return <Outlet />;

  return <Navigate to="/auth/login" replace />;
}
