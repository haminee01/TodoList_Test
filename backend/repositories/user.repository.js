const prisma = require("../utils/prisma.js")

class UserRepository {
  async findByEmail(email) {
    return prisma.user.findUnique({ where: { email } });
  }

  async create(userData) {
    return prisma.user.create({ data: userData });
  }
}

module.exports = new UserRepository();