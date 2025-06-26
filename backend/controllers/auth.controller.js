const authService = require("../services/auth.service");

exports.signup = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      return res.status(400).json({ message: "필수 입력값 누락" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "이메일 형식 오류" });
    }
    const result = await authService.signup({ email, password, username });
    return res.status(201).json(result);
  } catch (err) {
    if (err.message === "EXISTING_EMAIL") {
      return res.status(409).json({ message: "이미 등록된 이메일입니다." });
    }
    return res.status(500).json({ message: "서버 오류" });
  }

};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login({ email, password });
    return res.status(200).json(result);
  } catch (err) {
    if (err.message === "INVALID_CREDENTIALS") {
      return res.status(401).json({ message: "이메일 또는 비밀번호가 틀렸습니다." });
    }
    return res.status(500).json({ message: "서버 오류" });
  }
};
