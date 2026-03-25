import { useMemo } from 'react';
import { useAppSelector } from '../../app/hooks';

export default function DashboardPage() {
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const user = useAppSelector((state) => state.user.user);

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

  return (
    <section>
      <h1>Рабочая панель</h1>
      <p className="page-description">
        Добро пожаловать, {user?.name ?? 'пользователь'}. Здесь собрана сводка по задачам,
        а остальные разделы доступны как отдельные страницы через боковое меню.
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
