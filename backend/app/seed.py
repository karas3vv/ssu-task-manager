from datetime import datetime
from sqlalchemy.orm import Session
from .models import Category, Task, User
from .security import hash_password


def seed_data(db: Session) -> None:
    existing_user = db.query(User).filter(User.email == "student@example.com").first()
    if existing_user:
        return

    user = User(
        id="user-1",
        name="Vadim Karasev",
        email="student@example.com",
        password_hash=hash_password("123456"),
    )

    categories = [
        Category(id="cat-1", title="Учеба", color="#3b82f6"),
        Category(id="cat-2", title="Работа", color="#8b5cf6"),
        Category(id="cat-3", title="Личное", color="#10b981"),
    ]

    tasks = [
        Task(
            id="task-1",
            title="Подготовить архитектуру React",
            description="Собрать структуру папок, роутер и Redux Store.",
            status="in_progress",
            priority="high",
            due_date="2026-03-20",
            category_id="cat-1",
            user_id="user-1",
            created_at=datetime.fromisoformat("2026-03-10T10:00:00"),
            updated_at=datetime.fromisoformat("2026-03-10T10:00:00"),
        ),
        Task(
            id="task-2",
            title="Реализовать CRUD для задач",
            description="Добавить создание, редактирование, смену статуса и удаление.",
            status="todo",
            priority="medium",
            due_date="2026-03-24",
            category_id="cat-2",
            user_id="user-1",
            created_at=datetime.fromisoformat("2026-03-10T10:10:00"),
            updated_at=datetime.fromisoformat("2026-03-10T10:10:00"),
        ),
        Task(
            id="task-3",
            title="Подготовить раздел аналитики",
            description="Подсчитать задачи по статусам и приоритетам.",
            status="done",
            priority="low",
            due_date=None,
            category_id="cat-3",
            user_id="user-1",
            created_at=datetime.fromisoformat("2026-03-10T10:20:00"),
            updated_at=datetime.fromisoformat("2026-03-10T10:20:00"),
        ),
    ]

    db.add(user)
    db.add_all(categories)
    db.add_all(tasks)
    db.commit()
