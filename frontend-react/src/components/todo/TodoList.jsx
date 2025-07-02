import React from "react";
import TodoCard from "./TodoCard";

const TodoList = ({ todos, currentFilter }) => {
  const getFilteredTodos = () => {
    switch (currentFilter) {
      case "completed":
        return todos.filter((todo) => todo.isCompleted);
      case "incomplete":
        return todos.filter((todo) => !todo.isCompleted);
      default:
        return todos;
    }
  };
  const filteredTodos = getFilteredTodos();

  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4">
      {filteredTodos.map((todo) => (
        <div key={todo.id} className="col mb-3">
          <TodoCard todo={todo} />
        </div>
      ))}
    </div>
  );
};

export default TodoList;
