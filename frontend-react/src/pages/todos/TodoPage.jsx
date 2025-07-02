import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/ui/Header";
import { todos as initialTodos } from "../../utils/data";
import TodoList from "../../components/todo/TodoList";
import TodoForm from "../../components/todo/TodoForm";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import TodoAction from "../../components/ui/TodoAction";
import TodoStats from "../../components/ui/TodoStats";

function TodoPage({ currentUser, onLogout }) {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [currentFilter, setCurrentFilter] = useState("all");
  const [showTodoForm, setShowTodoForm] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);

  useEffect(() => {
    setTodos(initialTodos);
  }, []);

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  if (!currentUser) {
    navigate("/login");
    return null;
  }

  const handleAddTodo = (newTodo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const handleTogglecomplete = (todoId) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === todoId ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const handleDeleteTodo = (todoId) => {
    setTodoToDelete(todoId);
    setShowConfirmDialog(true);
  };

  const handleFilterChange = (filter) => {
    setCurrentFilter(filter);
  };

  const handleConfirmDelete = () => {
    if (todoToDelete) {
      setTodos((prevTodos) =>
        prevTodos.filter((todo) => todo.id !== todoToDelete)
      );
      setTodoToDelete(null);
    }
    setShowConfirmDialog(false);
  };
  const handleCancelDelete = () => {
    setTodoToDelete(null);
    setShowConfirmDialog(false);
  };

  return (
    <div className="bg-light">
      <Header currentUser={currentUser} onLogout={handleLogout} />
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <TodoStats todos={todos} />
          <TodoAction
            onAddClick={() => setShowTodoForm(true)}
            currentFilter={currentFilter}
            onFilterChange={handleFilterChange}
          />
        </div>
        <TodoList
          todos={todos}
          currentFilter={currentFilter}
          onToggleComplete={handleTogglecomplete}
          onDeleteTodo={handleDeleteTodo}
        />
        <TodoForm
          show={showTodoForm}
          onClose={() => setShowTodoForm(false)}
          onAddTodo={handleAddTodo}
        />
        <ConfirmDialog
          show={showConfirmDialog}
          title="할 일 삭제"
          message="정말로 이 할 일을 삭제하시겠습니까?"
          confirmText="삭제"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      </div>
    </div>
  );
}

export default TodoPage;
