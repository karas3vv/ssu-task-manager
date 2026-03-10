import { Link } from 'react-router-dom';
import type { Task } from '../../types';
import { formatDate } from '../../utils/formatDate';
import AppButton from '../../ui/AppButton/AppButton';

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onPatchStatus: (id: string) => void;
}

export default function TaskCard({ task, onDelete, onPatchStatus }: TaskCardProps) {
  return (
    <article className="task-card">
      <div className="task-card__top">
        <div>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
        </div>
        <span className={`badge badge-${task.status}`}>{task.status}</span>
      </div>
      <div className="task-meta">
        <span>Priority: {task.priority}</span>
        <span>Due: {formatDate(task.dueDate)}</span>
      </div>
      <div className="task-actions">
        <Link to={`/tasks/${task.id}`} className="link-button">Details</Link>
        <AppButton type="button" onClick={() => onPatchStatus(task.id)}>Next status</AppButton>
        <AppButton type="button" onClick={() => onDelete(task.id)}>Delete</AppButton>
      </div>
    </article>
  );
}
