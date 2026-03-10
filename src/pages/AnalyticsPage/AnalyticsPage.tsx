import { useMemo } from 'react';
import { useAppSelector } from '../../app/hooks';

export default function AnalyticsPage() {
  const tasks = useAppSelector((state) => state.tasks.tasks);

  const stats = useMemo(() => {
    return {
      todo: tasks.filter((task) => task.status === 'todo').length,
      inProgress: tasks.filter((task) => task.status === 'in_progress').length,
      done: tasks.filter((task) => task.status === 'done').length,
      highPriority: tasks.filter((task) => task.priority === 'high').length,
    };
  }, [tasks]);

  return (
    <section>
      <h1>Аналитика</h1>
      <p className="page-description">Сводка по статусам и приоритетам задач.</p>
      <div className="stats-grid">
        <div className="panel"><h3>К выполнению</h3><p>{stats.todo}</p></div>
        <div className="panel"><h3>В процессе</h3><p>{stats.inProgress}</p></div>
        <div className="panel"><h3>Выполнено</h3><p>{stats.done}</p></div>
        <div className="panel"><h3>Высокий приоритет</h3><p>{stats.highPriority}</p></div>
      </div>
    </section>
  );
}
