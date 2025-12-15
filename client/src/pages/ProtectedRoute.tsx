import { Roles } from "@/enums/roles";
import { useLoginState } from "@/zustand/login";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({
  currentRole,
}: {
  currentRole: Roles;
}) {
  const { token, role } = useLoginState((state) => state.login);
  return token && role === currentRole ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/login" />
  );
}
