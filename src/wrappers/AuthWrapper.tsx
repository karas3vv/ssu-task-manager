import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';

export default function AuthWrapper() {
  const location = useLocation();
  const isAuth = useAppSelector((state) => state.user.isAuth);

  if (!isAuth) {
    return <Navigate to="/auth-required" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
