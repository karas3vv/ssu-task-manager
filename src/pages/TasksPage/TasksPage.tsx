import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import TaskCard from '../../components/TaskCard/TaskCard';
import TaskForm from '../../components/TaskForm/TaskForm';
import { createTaskAsync, deleteTaskAsync, fetchTasks, patchTaskStatusAsync, setSearch, setStatusFilter } from '../../store/tasks/tasksSlice';
import type { CreateTaskPayload, TaskStatus } from '../../types';
import AppInput from '../../ui/AppInput/AppInput';
import AppSelect from '../../ui/AppSelect/AppSelect';

const nextStatusMap: Record<TaskStatus, TaskStatus> = {
  todo: 'in_progress',
  in_progress: 'done',
  done: 'todo',
};

export default function TasksPage() {
  const dispatch = useAppDispatch();
  const { tasks, search, statusFilter } = useAppSelector((state) => state.tasks);

  useEffect(() => {
    void dispatch(fetchTasks());
  }, [dispatch]);

  const handleCreate = (values: CreateTaskPayload | (CreateTaskPayload & { id?: string })) => {
    const { id: _unusedId, ...payload } = values;
    void dispatch(createTaskAsync(payload));
  };

  const handleDelete = (id: string) => {
    void dispatch(deleteTaskAsync(id));
  };

  const handlePatchStatus = (id: string) => {
    const task = tasks.find((item) => item.id === id);
    if (!task) {
      return;
    }
    void dispatch(patchTaskStatusAsync({ id, status: nextStatusMap[task.status] }));
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <section className="tasks-page">
      <div>
        <h1>Tasks</h1>
        <p className="page-description">Create tasks, filter them and update their status.</p>
        <div className="filters-row panel">
          <AppInput label="Search by title" value={search} onChange={(event) => dispatch(setSearch(event.target.value))} />
          <AppSelect
            label="Status filter"
            value={statusFilter}
            onChange={(event) => dispatch(setStatusFilter(event.target.value as TaskStatus | 'all'))}
            options={[
              { label: 'All', value: 'all' },
              { label: 'To do', value: 'todo' },
              { label: 'In progress', value: 'in_progress' },
              { label: 'Done', value: 'done' },
            ]}
          />
        </div>
        <div className="task-list">
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} onDelete={handleDelete} onPatchStatus={handlePatchStatus} />
          ))}
        </div>
      </div>
      <TaskForm onSubmit={handleCreate} />
    </section>
  );
}
