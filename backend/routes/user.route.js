const express = require("express");
const router = express.Router();
const userController = require("../controller/user.cotroller");

router.get("/", userController.getUsers);
router.post("/save", userController.saveUser);
router.get("/authenticate", userController.authenticateUser);
module.exports = router;