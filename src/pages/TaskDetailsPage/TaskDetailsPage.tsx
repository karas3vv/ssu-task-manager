import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import TaskForm from '../../components/TaskForm/TaskForm';
import { clearCurrentTask, fetchTaskById, updateTaskAsync } from '../../store/tasks/tasksSlice';
import type { CreateTaskPayload } from '../../types';

export default function TaskDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentTask = useAppSelector((state) => state.tasks.currentTask);

  useEffect(() => {
    if (id) {
      void dispatch(fetchTaskById(id));
    }
    return () => {
      dispatch(clearCurrentTask());
    };
  }, [dispatch, id]);

  const handleSubmit = async (values: CreateTaskPayload | (CreateTaskPayload & { id?: string })) => {
    if (!id) {
      return;
    }
    const { id: _unusedId, ...payload } = values;
    const resultAction = await dispatch(updateTaskAsync({ id, ...payload }));
    if (updateTaskAsync.fulfilled.match(resultAction)) {
      navigate('/tasks');
    }
  };

  return (
    <section>
      <h1>Task details</h1>
      <p className="page-description">This page demonstrates GET by id and PUT update.</p>
      {currentTask ? <TaskForm initialTask={currentTask} onSubmit={handleSubmit} /> : <p>Loading task...</p>}
    </section>
  );
}
