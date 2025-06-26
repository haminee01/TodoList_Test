const prisma = require("../utils/prisma");

class TodoRepository {
  async createTodo({ userId, content }) {
    return prisma.todo.create({
      data: {
        userId,
        content
      }
    });
  }

  async findTodosByUser(userId) {
    return prisma.todo.findMany({
      where: { userId }
    });
  }

  async updateTodoStatus(todoId, isDone) {
    return prisma.todo.update({
      where: { todoId },
      data: { isDone }
    });
  }

  async deleteTodo(todoId) {
    return prisma.todo.delete({
      where: { todoId }
    });
  }
}

module.exports = new TodoRepository();
