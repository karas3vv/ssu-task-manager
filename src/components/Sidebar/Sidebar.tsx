import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';

export default function Sidebar() {
  const isAuth = useAppSelector((state) => state.user.isAuth);

  if (!isAuth) {
    return null;
  }

  return (
    <aside className="sidebar">
      <NavLink to="/dashboard">Dashboard</NavLink>
      <NavLink to="/tasks">Tasks</NavLink>
      <NavLink to="/analytics">Analytics</NavLink>
      <NavLink to="/categories">Categories</NavLink>
      <NavLink to="/profile">Profile</NavLink>
    </aside>
  );
}
