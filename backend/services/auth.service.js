const bcrypt = require("bcrypt");
const userRepository = require("../repositories/user.repository");
const { generateTokens } = require("../utils/jwt");

class AuthService {
  async signup({ email, password, username }) {
    const existing = await userRepository.findByEmail(email);
    if (existing) throw new Error("EXISTING_EMAIL");

    const hashedPw = await bcrypt.hash(password, 10);
    const newUser = await userRepository.create({ email, password: hashedPw, username });
    return { userId: newUser.userId };
  }

  async login({ email, password }) {
    const user = await userRepository.findByEmail(email);
    if (!user) throw new Error("INVALID_CREDENTIALS");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("INVALID_CREDENTIALS");

    return generateTokens(user.userId);
  }
}

module.exports = new AuthService();