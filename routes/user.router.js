const router = require("express").Router();
const userController = require("../controllers/user.controller");

router.get("/healthCheck", userController.healthCheck);
router.post("/user/create", userController.createUserRecord);

module.exports = router;
