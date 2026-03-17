import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Sidebar from '../../components/Sidebar/Sidebar';
import { fetchCategories } from '../../store/categories/categoriesSlice';
import { fetchProfile } from '../../store/user/userSlice';
import { fetchTasks } from '../../store/tasks/tasksSlice';
import AnalyticsPage from '../AnalyticsPage/AnalyticsPage';
import CategoriesPage from '../CategoriesPage/CategoriesPage';
import ProfilePage from '../ProfilePage/ProfilePage';
import TasksPage from '../TasksPage/TasksPage';

type SectionKey = 'overview' | 'tasks' | 'analytics' | 'categories' | 'profile';

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const [activeSection, setActiveSection] = useState<SectionKey>('overview');
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const categories = useAppSelector((state) => state.categories.categories);
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    if (!user) {
      void dispatch(fetchProfile());
    }
    if (!tasks.length) {
      void dispatch(fetchTasks());
    }
    if (!categories.length) {
      void dispatch(fetchCategories());
    }
  }, [categories.length, dispatch, tasks.length, user]);

  const stats = useMemo(() => {
    const doneCount = tasks.filter((task) => task.status === 'done').length;
    const activeCount = tasks.filter((task) => task.status !== 'done').length;
    const highPriorityCount = tasks.filter((task) => task.priority === 'high').length;

    return {
      total: tasks.length,
      active: activeCount,
      done: doneCount,
      highPriority: highPriorityCount,
    };
  }, [tasks]);

  const renderContent = () => {
    switch (activeSection) {
      case 'tasks':
        return <TasksPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'categories':
        return <CategoriesPage />;
      case 'profile':
        return <ProfilePage />;
      case 'overview':
      default:
        return (
          <section>
            <h1>Рабочая панель</h1>
            <p className="page-description">
              Добро пожаловать, {user?.name ?? 'пользователь'}. Это единая страница приложения,
              внутри которой собраны все основные компоненты: задачи, аналитика, категории и профиль.
            </p>
            <div className="stats-grid">
              <div className="panel"><h3>Всего задач</h3><p>{stats.total}</p></div>
              <div className="panel"><h3>Активных задач</h3><p>{stats.active}</p></div>
              <div className="panel"><h3>Выполнено</h3><p>{stats.done}</p></div>
              <div className="panel"><h3>Высокий приоритет</h3><p>{stats.highPriority}</p></div>
            </div>
          </section>
        );
    }
  };

  return (
    <div className="dashboard-shell">
      <Sidebar activeSection={activeSection} onChange={(section) => setActiveSection(section as SectionKey)} />
      <div className="dashboard-content">{renderContent()}</div>
    </div>
  );
}
