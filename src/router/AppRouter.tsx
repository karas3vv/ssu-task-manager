import { Route, Routes } from 'react-router-dom';
import CommonWrapper from '../wrappers/CommonWrapper';
import AuthWrapper from '../wrappers/AuthWrapper';
import DashboardLayout from '../wrappers/DashboardLayout';
import LandingPage from '../pages/LandingPage/LandingPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import DashboardPage from '../pages/DashboardPage/DashboardPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import UnauthorizedPage from '../pages/UnauthorizedPage/UnauthorizedPage';
import TasksPage from '../pages/TasksPage/TasksPage';
import TaskDetailsPage from '../pages/TaskDetailsPage/TaskDetailsPage';
import AnalyticsPage from '../pages/AnalyticsPage/AnalyticsPage';
import CategoriesPage from '../pages/CategoriesPage/CategoriesPage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<CommonWrapper />}>
        <Route path="/auth-required" element={<UnauthorizedPage />} />
      </Route>

      <Route element={<CommonWrapper />}>
        <Route element={<AuthWrapper />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/tasks/:id" element={<TaskDetailsPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
