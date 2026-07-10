import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  const userLogin = useSelector((state) => state.userLogin);

  const { loading, userInfo } = userLogin;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-black border-t-transparent"></div>
      </div>
    );
  }

  // Not logged in
  if (!userInfo) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Must change password before accessing LMS
  if (userInfo.mustChangePassword && location.pathname !== "/change-password") {
    return <Navigate to="/change-password" replace />;
  }

  return children;
};

export default ProtectedRoute;
