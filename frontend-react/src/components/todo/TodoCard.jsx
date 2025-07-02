import React from "react";

const TodoCard = ({ todo }) => {
  return (
    <div
      className={`card h-100 shadow-sm ${todo.isCompleted ? "bg-light" : ""}`}
    >
      <div className="card-body d-flex flex-column">
        <h5
          className={`card-title ${
            todo.isCompleted ? "text-decoration-line-through text-muted" : ""
          } `}
        >
          {todo.title}
        </h5>
        {todo.description && (
          <p className="card-text text-muted small flex-grow-1">
            {todo.description}{" "}
          </p>
        )}
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <span
            className={`badge ${
              todo.isCompleted ? "bg-success" : "bg-warning text-dark"
            }`}
          >
            {todo.isCompleted ? "완료" : "미완료"}
          </span>
          <div className="d-flex gap-2 align-items-center">
            <div className="form-check form-switch">
              <input
                type="checkbox"
                checked={todo.isCompleted}
                id={`toggle-${todo.id}`}
                disabled
              />
              <label
                className="form-check-label small"
                htmlFor={`toggle-${todo.id}`}
              >
                상태 변경
              </label>
            </div>
            <button
              className="btn btn-outline-secondary btn-sm"
              disabled
              type="button"
            >
              삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
