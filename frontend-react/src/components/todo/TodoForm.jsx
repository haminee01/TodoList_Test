import React, { useState } from "react";
import { todos } from "../../utils/data";

const TodoForm = ({ show, onClose, onAddTodo }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }
    const newTodo = {
      id: todos.reduce((maxId, todos) => Math.max(maxId, todos.id) + 1, 0),
      title,
      description,
      isCompleted,
    };
    onAddTodo(newTodo);
    handleClose();
  };

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setIsCompleted(false);
    onClose();
  };

  if (!show) return null;

  return (
    <>
      <div
        className="modal fade show"
        style={{ display: "block" }}
        tabIndex="-1"
        aria-labelledby="todoModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="todoModalLabel">
                새 할 일 추가
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleClose}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="todoTitle" className="form-label">
                    제목 <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="todoTitle"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    placeholder="할 일 제목을 입력하세요"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="todoDescription" className="form-label">
                    설명
                  </label>
                  <textarea
                    className="form-control"
                    id="todoDescription"
                    rows="3"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="할 일에 대한 설명을 입력하세요 (선택사항)"
                  ></textarea>
                </div>
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="todoIsCompleted"
                    checked={isCompleted}
                    onChange={(e) => setIsCompleted(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="todoIsCompleted">
                    완료됨
                  </label>
                </div>
                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-primary">
                    <i className="bi bi-plus-circle"></i> 추가
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleClose}
                  >
                    <i className="bi bi-x-circle"></i> 취소
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
};

export default TodoForm;
