import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Sidebar from '../components/Sidebar/Sidebar';
import { fetchCategories } from '../store/categories/categoriesSlice';
import { fetchTasks } from '../store/tasks/tasksSlice';
import { fetchProfile } from '../store/user/userSlice';
import { routeStorage } from '../utils/localStorage';

export default function DashboardLayout() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const token = useAppSelector((state) => state.user.token);
  const user = useAppSelector((state) => state.user.user);
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const categories = useAppSelector((state) => state.categories.categories);

  useEffect(() => {
    routeStorage.setLastRoute(`${location.pathname}${location.search}${location.hash}`);
  }, [location.hash, location.pathname, location.search]);

  useEffect(() => {
    if (token && !user) {
      void dispatch(fetchProfile());
    }
    if (!tasks.length) {
      void dispatch(fetchTasks());
    }
    if (!categories.length) {
      void dispatch(fetchCategories());
    }
  }, [categories.length, dispatch, tasks.length, token, user]);

  return (
    <div className="dashboard-shell">
      <Sidebar />
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
}
