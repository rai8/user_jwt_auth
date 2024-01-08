const router = require("express").Router();
const userController = require("../controllers/user.controller");

router.get("/api/healthCheck", userController.healthCheck);

module.exports = router;
