import { useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import TaskCard from '../../components/TaskCard/TaskCard';
import TaskForm from '../../components/TaskForm/TaskForm';
import {
  createTaskAsync,
  deleteTaskAsync,
  patchTaskStatusAsync,
  setSearch,
  setStatusFilter,
  updateTaskAsync,
} from '../../store/tasks/tasksSlice';
import type { CreateTaskPayload, Task, TaskStatus } from '../../types';
import AppInput from '../../ui/AppInput/AppInput';
import AppSelect from '../../ui/AppSelect/AppSelect';
import AppButton from '../../ui/AppButton/AppButton';

const nextStatusMap: Record<TaskStatus, TaskStatus> = {
  todo: 'in_progress',
  in_progress: 'done',
  done: 'todo',
};

export default function TasksPage() {
  const dispatch = useAppDispatch();
  const { tasks, search, statusFilter } = useAppSelector((state) => state.tasks);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);

  const handleSubmit = async (values: CreateTaskPayload & { id?: string }) => {
    const { id: _unusedId, ...payload } = values;

    if (editingTask?.id) {
      await dispatch(updateTaskAsync({ id: editingTask.id, ...payload }));
      setEditingTask(undefined);
      return;
    }

    await dispatch(createTaskAsync(payload));
  };

  const handleDelete = (id: string) => {
    void dispatch(deleteTaskAsync(id));
    if (editingTask?.id === id) {
      setEditingTask(undefined);
    }
  };

  const handlePatchStatus = (id: string) => {
    const task = tasks.find((item) => item.id === id);
    if (!task) {
      return;
    }
    void dispatch(patchTaskStatusAsync({ id, status: nextStatusMap[task.status] }));
  };

  const filteredTasks = useMemo(() => tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  }), [tasks, search, statusFilter]);

  return (
    <section className="tasks-page">
      <div>
        <h1>Задачи</h1>
        <p className="page-description">Создавайте задачи, фильтруйте их и редактируйте прямо на этой же странице.</p>
        <div className="filters-row panel">
          <AppInput label="Поиск по названию" value={search} onChange={(event) => dispatch(setSearch(event.target.value))} />
          <AppSelect
            label="Фильтр по статусу"
            value={statusFilter}
            onChange={(event) => dispatch(setStatusFilter(event.target.value as TaskStatus | 'all'))}
            options={[
              { label: 'Все', value: 'all' },
              { label: 'К выполнению', value: 'todo' },
              { label: 'В процессе', value: 'in_progress' },
              { label: 'Выполнено', value: 'done' },
            ]}
          />
        </div>
        <div className="task-list">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={handleDelete}
              onPatchStatus={handlePatchStatus}
              onEdit={(selectedTask) => setEditingTask(selectedTask)}
            />
          ))}
        </div>
      </div>
      <div>
        <TaskForm initialTask={editingTask} onSubmit={handleSubmit} />
        {editingTask && (
          <div className="task-form-actions">
            <AppButton type="button" onClick={() => setEditingTask(undefined)}>Отменить редактирование</AppButton>
          </div>
        )}
      </div>
    </section>
  );
}
