// src/components/ProtectedRoute.jsx
// Usage : <ProtectedRoute><DashboardPage /></ProtectedRoute>
import { Navigate } from "react-router-dom";
 
export function ProtectedRoute({ children }) {
  try {
    const raw = localStorage.getItem("admin_session");
    if (!raw) return <Navigate to="/login" replace />;
    const s = JSON.parse(raw);
    if (s.expiresAt <= Date.now()) {
      localStorage.removeItem("admin_session");
      return <Navigate to="/login" replace />;
    }
    return children;
  } catch {
    return <Navigate to="/login" replace />;
  }
}
 