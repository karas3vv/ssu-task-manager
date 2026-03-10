import type { Task } from '../../types';
import { formatDate } from '../../utils/formatDate';
import AppButton from '../../ui/AppButton/AppButton';

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onPatchStatus: (id: string) => void;
  onEdit: (task: Task) => void;
}

const statusMap = {
  todo: 'К выполнению',
  in_progress: 'В процессе',
  done: 'Выполнено',
};

const priorityMap = {
  low: 'Низкий',
  medium: 'Средний',
  high: 'Высокий',
};

export default function TaskCard({ task, onDelete, onPatchStatus, onEdit }: TaskCardProps) {
  return (
    <article className="task-card">
      <div className="task-card__top">
        <div>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
        </div>
        <span className={`badge badge-${task.status}`}>{statusMap[task.status]}</span>
      </div>
      <div className="task-meta">
        <span>Приоритет: {priorityMap[task.priority]}</span>
        <span>Срок: {formatDate(task.dueDate)}</span>
      </div>
      <div className="task-actions">
        <AppButton type="button" onClick={() => onEdit(task)}>Редактировать</AppButton>
        <AppButton type="button" onClick={() => onPatchStatus(task.id)}>Следующий статус</AppButton>
        <AppButton type="button" onClick={() => onDelete(task.id)}>Удалить</AppButton>
      </div>
    </article>
  );
}
