import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

const ProtectedRoute = ({
  children,
  requireAuth = true,
}: ProtectedRouteProps) => {
  const { user, loading } = useSelector((state: any) => state.auth);

  // Network hatalarını yakalamak için global error handler
  useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      if (
        event.reason?.message?.includes("ERR_BLOCKED_BY_CLIENT") ||
        event.reason?.message?.includes("net::ERR_BLOCKED_BY_CLIENT")
      ) {
        // Bu hataları sessizce işle, konsola log yazdırma
        event.preventDefault();
      }
    };

    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    return () => {
      window.removeEventListener(
        "unhandledrejection",
        handleUnhandledRejection
      );
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Eğer authentication gerekiyorsa ve kullanıcı yoksa login sayfasına yönlendir
  if (requireAuth && !user) {
    return <Navigate to="/login" replace />;
  }

  // Eğer authentication gerekmiyorsa (login/register sayfaları) ve kullanıcı varsa ana sayfaya yönlendir
  if (!requireAuth && user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
