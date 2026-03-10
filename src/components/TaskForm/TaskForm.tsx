import { useEffect, useState } from 'react';
import type { CreateTaskPayload, Task, TaskPriority, TaskStatus } from '../../types';
import AppButton from '../../ui/AppButton/AppButton';
import AppInput from '../../ui/AppInput/AppInput';
import AppSelect from '../../ui/AppSelect/AppSelect';

interface TaskFormProps {
  initialTask?: Task;
  onSubmit: (values: CreateTaskPayload & { id?: string }) => void;
}

export default function TaskForm({ initialTask, onSubmit }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TaskStatus>('todo');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    setTitle(initialTask?.title ?? '');
    setDescription(initialTask?.description ?? '');
    setStatus(initialTask?.status ?? 'todo');
    setPriority(initialTask?.priority ?? 'medium');
    setDueDate(initialTask?.dueDate ?? '');
  }, [initialTask]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({
      id: initialTask?.id,
      title,
      description,
      status,
      priority,
      dueDate: dueDate || null,
      categoryId: null,
    });

    if (!initialTask) {
      setTitle('');
      setDescription('');
      setStatus('todo');
      setPriority('medium');
      setDueDate('');
    }
  };

  return (
    <form className="panel task-form" onSubmit={handleSubmit}>
      <h3>{initialTask ? 'Редактирование задачи' : 'Создание задачи'}</h3>
      <AppInput label="Название" value={title} onChange={(event) => setTitle(event.target.value)} required />
      <AppInput label="Описание" value={description} onChange={(event) => setDescription(event.target.value)} required />
      <AppSelect
        label="Статус"
        value={status}
        onChange={(event) => setStatus(event.target.value as TaskStatus)}
        options={[
          { label: 'К выполнению', value: 'todo' },
          { label: 'В процессе', value: 'in_progress' },
          { label: 'Выполнено', value: 'done' },
        ]}
      />
      <AppSelect
        label="Приоритет"
        value={priority}
        onChange={(event) => setPriority(event.target.value as TaskPriority)}
        options={[
          { label: 'Низкий', value: 'low' },
          { label: 'Средний', value: 'medium' },
          { label: 'Высокий', value: 'high' },
        ]}
      />
      <AppInput label="Срок выполнения" type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} />
      <AppButton type="submit">{initialTask ? 'Сохранить изменения' : 'Сохранить задачу'}</AppButton>
    </form>
  );
}
