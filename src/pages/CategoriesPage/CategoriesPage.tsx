import { useAppSelector } from '../../app/hooks';

export default function CategoriesPage() {
  const categories = useAppSelector((state) => state.categories.categories);

  return (
    <section>
      <h1>Категории</h1>
      <p className="page-description">Список доступных категорий задач.</p>
      <div className="stats-grid">
        {categories.map((category) => (
          <article key={category.id} className="panel">
            <div className="category-dot" style={{ backgroundColor: category.color }} />
            <h3>{category.title}</h3>
            <p>Цвет: {category.color}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
