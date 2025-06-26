const todoRepository = require("../repositories/todo.repository");

class TodoService {
  async create(userId, content) {
    return await todoRepository.createTodo({ userId, content });
  }

  async list(userId) {
    return await todoRepository.findTodosByUser(userId);
  }

  async toggle(todoId, isDone) {
    return await todoRepository.updateTodoStatus(todoId, isDone);
  }

  async remove(todoId) {
    return await todoRepository.deleteTodo(todoId);
  }
}

module.exports = new TodoService();
