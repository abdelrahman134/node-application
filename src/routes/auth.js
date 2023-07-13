const express = require("express");
const router = express.Router();
const userController = require("../controllers/auth");

const verifyToken = require("../middleware/verifyToken");
router.post("/login", userController.login);

router.get("/logout", verifyToken,userController.logout);

router.post("/register", userController.register);
module.exports = router;