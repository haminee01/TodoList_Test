import React from "react";
import TodoFilter from "../todo/TodoFilter";

function TodoAction({ onAddClick, currentFilter, onFilterChange }) {
  return (
    <div className="d-flex gap-2">
      <button type="button" className="btn btn-success" onClick={onAddClick}>
        할 일 추가
      </button>

      {
        <TodoFilter
          currentFilter={currentFilter}
          onFilterChange={onFilterChange}
        />
      }
    </div>
  );
}

export default TodoAction;
