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
      <h1>Analytics</h1>
      <div className="stats-grid">
        <div className="panel"><h3>To do</h3><p>{stats.todo}</p></div>
        <div className="panel"><h3>In progress</h3><p>{stats.inProgress}</p></div>
        <div className="panel"><h3>Done</h3><p>{stats.done}</p></div>
        <div className="panel"><h3>High priority</h3><p>{stats.highPriority}</p></div>
      </div>
    </section>
  );
}
