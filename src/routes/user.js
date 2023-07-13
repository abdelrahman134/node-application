const express = require("express");
const  userController = require("../controllers/user");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router.delete("/:id", verifyToken, userController.delete);
router.get("/:id", verifyToken, userController.getUser);
router.patch("/:id", verifyToken, userController.updates);

module.exports= router;
