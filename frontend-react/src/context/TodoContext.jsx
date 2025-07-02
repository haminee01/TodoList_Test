import React, { createContext, useContext, useState, useEffect } from "react";
import { initialTodos, todoAPI } from "../utils/data";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [currentFilter, setCurrentFilter] = useState("all");

  const [showTodoForm, setShowTodoForm] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setLoading(true);
      const data = await todoAPI.fetchTodos();
      setTodos(data);
    } catch (e) {
      setError(true);
      throw Error();
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!todoToDelete) return;

    try {
      await todoAPI.deleteTodo(todoToDelete);
      setTodos((prevTodos) =>
        prevTodos.filter((todo) => todo.id !== todoToDelete)
      );
      setTodoToDelete(null);
    } catch (e) {
    } finally {
      setShowConfirmDialog(false);
    }
  };

  const handleCancelDelete = () => {
    setTodoToDelete(null);
    setShowConfirmDialog(false);
  };

  const handleDeleteTodo = (todoId) => {
    setTodoToDelete(todoId);
    setShowConfirmDialog(true);
  };

  const handleAddTodo = async (newTodo) => {
    try {
      const addedTodo = await todoAPI.addTodo(newTodo);
      setTodos((prevTodos) => [...prevTodos, addedTodo]);
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message };
    }
  };

  const handleFilterChange = (filter) => {
    setCurrentFilter(filter);
  };

  const handleToggleComplete = async (todoId) => {
    try {
      const todo = todos.find((t) => t.id === todoId);
      if (!todo) return;

      const result = await todoAPI.toggleTodo(todoId, !todo.isCompleted);

      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === todoId
            ? { ...todo, isCompleted: result.isCompleted }
            : todo
        )
      );
    } catch (e) {}
  };

  const openTodoForm = () => setShowTodoForm(true);
  const closeTodoForm = () => setShowTodoForm(false);

  const value = {
    // state
    todos,
    currentFilter,
    showTodoForm,
    showConfirmDialog,
    todoToDelete,
    // 함수
    handleToggleComplete,
    handleDeleteTodo,
    handleConfirmDelete,
    handleCancelDelete,
    handleAddTodo,
    handleFilterChange,
    openTodoForm,
    closeTodoForm,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
