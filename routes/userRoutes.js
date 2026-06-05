const express = require("express");

const router = express.Router();

const userController = require("../controllers/userController");

const basicAuth = require("../middleware/basicAuth");

router.post("/", userController.createUser);
router.get("/self", basicAuth, userController.getUser);

module.exports = router;