import { Navigate, Route, Routes } from 'react-router-dom';
import CommonWrapper from '../wrappers/CommonWrapper';
import AuthWrapper from '../wrappers/AuthWrapper';
import LandingPage from '../pages/LandingPage/LandingPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import DashboardPage from '../pages/DashboardPage/DashboardPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<CommonWrapper />}>
        <Route element={<AuthWrapper />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/tasks" element={<Navigate to="/dashboard" replace />} />
          <Route path="/tasks/:id" element={<Navigate to="/dashboard" replace />} />
          <Route path="/analytics" element={<Navigate to="/dashboard" replace />} />
          <Route path="/categories" element={<Navigate to="/dashboard" replace />} />
          <Route path="/profile" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
