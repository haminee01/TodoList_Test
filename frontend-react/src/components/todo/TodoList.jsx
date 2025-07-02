import React, { useMemo } from "react";
import TodoCard from "./TodoCard";
import EmptyState from "../ui/EmptyState";

function TodoList({ todos, currentFilter, onToggleComplete, onDeleteTodo }) {
  const filteredTodos = useMemo(() => {
    switch (currentFilter) {
      case "completed":
        return todos.filter((todo) => todo.isCompleted);
      case "incompleted":
        return todos.filter((todo) => !todo.isCompleted);
      default:
        return todos;
    }
  }, [todos, currentFilter]);

  if (filteredTodos.length === 0) {
    return <EmptyState message="표시할 할 일이 없습니다." />;
  }

  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
      {filteredTodos.map((todo) => (
        <div key={todo.id} className="col">
          <TodoCard
            onToggleComplete={onToggleComplete}
            onDeleteTodo={onDeleteTodo}
            todo={todo}
          />
        </div>
      ))}
    </div>
  );
}

export default TodoList;
