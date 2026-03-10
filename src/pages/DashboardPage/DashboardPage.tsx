import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchTasks } from '../../store/tasks/tasksSlice';

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    if (!tasks.length) {
      void dispatch(fetchTasks());
    }
  }, [dispatch, tasks.length]);

  const doneCount = tasks.filter((task) => task.status === 'done').length;
  const activeCount = tasks.filter((task) => task.status !== 'done').length;

  return (
    <section>
      <h1>Dashboard</h1>
      <p className="page-description">Welcome back, {user?.name ?? 'student'}.</p>
      <div className="stats-grid">
        <div className="panel"><h3>Total tasks</h3><p>{tasks.length}</p></div>
        <div className="panel"><h3>Active tasks</h3><p>{activeCount}</p></div>
        <div className="panel"><h3>Done tasks</h3><p>{doneCount}</p></div>
      </div>
    </section>
  );
}
