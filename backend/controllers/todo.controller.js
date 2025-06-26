const todoService = require("../services/todo.service");

exports.createTodo = async (req, res) => {
  const { content } = req.body;
  const userId = req.body.userId;
  if (!content || !userId) return res.status(400).json({ message: "입력값 부족" });

  const todo = await todoService.create(userId, content);
  return res.status(201).json(todo);
};

exports.getTodos = async (req, res) => {
  const userId = req.body.userId;
  const todos = await todoService.list(userId);
  return res.status(200).json(todos);
};

exports.updateTodo = async (req, res) => {
  const { todoId, isDone } = req.body;
  const updated = await todoService.toggle(todoId, isDone);
  return res.status(200).json(updated);
};

exports.deleteTodo = async (req, res) => {
  const { todoId } = req.body;
  await todoService.remove(todoId);
  return res.status(204).end();
};
