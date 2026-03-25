import { NavLink } from 'react-router-dom';

const items = [
  { to: '/dashboard', label: 'Обзор', end: true },
  { to: '/tasks', label: 'Задачи' },
  { to: '/analytics', label: 'Аналитика' },
  { to: '/categories', label: 'Категории' },
  { to: '/profile', label: 'Профиль' },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
        >
          {item.label}
        </NavLink>
      ))}
    </aside>
  );
}
