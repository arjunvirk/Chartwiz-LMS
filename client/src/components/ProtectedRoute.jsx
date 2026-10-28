import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  const userLogin = useSelector((state) => state.userLogin);

  const { loading, userInfo } = userLogin;

  if (loading) {
    return (
      <div className="ac-route-loader" role="status" aria-live="polite">
        <div className="ac-route-loader-inner">
          <div className="ac-route-loader-bars" aria-hidden="true"><span /><span /><span /><span /></div>
          <span>Loading your workspace…</span>
        </div>
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

