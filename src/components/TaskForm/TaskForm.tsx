import { useState } from 'react';
import type { CreateTaskPayload, Task, TaskPriority, TaskStatus } from '../../types';
import AppButton from '../../ui/AppButton/AppButton';
import AppInput from '../../ui/AppInput/AppInput';
import AppSelect from '../../ui/AppSelect/AppSelect';

interface TaskFormProps {
  initialTask?: Task;
  onSubmit: (values: CreateTaskPayload | (CreateTaskPayload & { id?: string })) => void;
}

export default function TaskForm({ initialTask, onSubmit }: TaskFormProps) {
  const [title, setTitle] = useState(initialTask?.title ?? '');
  const [description, setDescription] = useState(initialTask?.description ?? '');
  const [status, setStatus] = useState<TaskStatus>(initialTask?.status ?? 'todo');
  const [priority, setPriority] = useState<TaskPriority>(initialTask?.priority ?? 'medium');
  const [dueDate, setDueDate] = useState(initialTask?.dueDate ?? '');

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
  };

  return (
    <form className="panel task-form" onSubmit={handleSubmit}>
      <h3>{initialTask ? 'Edit task' : 'Create task'}</h3>
      <AppInput label="Title" value={title} onChange={(event) => setTitle(event.target.value)} required />
      <AppInput label="Description" value={description} onChange={(event) => setDescription(event.target.value)} required />
      <AppSelect
        label="Status"
        value={status}
        onChange={(event) => setStatus(event.target.value as TaskStatus)}
        options={[
          { label: 'To do', value: 'todo' },
          { label: 'In progress', value: 'in_progress' },
          { label: 'Done', value: 'done' },
        ]}
      />
      <AppSelect
        label="Priority"
        value={priority}
        onChange={(event) => setPriority(event.target.value as TaskPriority)}
        options={[
          { label: 'Low', value: 'low' },
          { label: 'Medium', value: 'medium' },
          { label: 'High', value: 'high' },
        ]}
      />
      <AppInput label="Due date" type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} />
      <AppButton type="submit">Save task</AppButton>
    </form>
  );
}
