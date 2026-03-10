interface SidebarProps {
  activeSection: string;
  onChange: (section: string) => void;
}

const items = [
  { key: 'overview', label: 'Обзор' },
  { key: 'tasks', label: 'Задачи' },
  { key: 'analytics', label: 'Аналитика' },
  { key: 'categories', label: 'Категории' },
  { key: 'profile', label: 'Профиль' },
];

export default function Sidebar({ activeSection, onChange }: SidebarProps) {
  return (
    <aside className="sidebar">
      {items.map((item) => (
        <button
          key={item.key}
          type="button"
          className={`sidebar-link ${activeSection === item.key ? 'active' : ''}`}
          onClick={() => onChange(item.key)}
        >
          {item.label}
        </button>
      ))}
    </aside>
  );
}
