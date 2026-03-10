import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchCategories } from '../../store/categories/categoriesSlice';

export default function CategoriesPage() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories.categories);

  useEffect(() => {
    if (!categories.length) {
      void dispatch(fetchCategories());
    }
  }, [categories.length, dispatch]);

  return (
    <section>
      <h1>Categories</h1>
      <div className="stats-grid">
        {categories.map((category) => (
          <article key={category.id} className="panel">
            <div className="category-dot" style={{ backgroundColor: category.color }} />
            <h3>{category.title}</h3>
            <p>Color: {category.color}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
