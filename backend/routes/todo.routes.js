const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todo.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

router.post("/", verifyToken, todoController.createTodo);
router.get("/", verifyToken, todoController.getTodos);
router.patch("/", verifyToken, todoController.updateTodo);
router.delete("/", verifyToken, todoController.deleteTodo);

module.exports = router;