const router = require("express").Router();
const userController = require("../controllers/user.controller");
const { verifyToken } = require("../core/passport");
const authMiddleWare = require("../middlewares/auth.middleware");

router.get("/healthCheck", userController.healthCheck);
router.post("/user/create", userController.createUserRecord);
router.get("/users/fetch", [verifyToken, authMiddleWare.isAdminRole], userController.getAllUserRecords);
router.get("/user/fetch/:userId", [verifyToken, authMiddleWare.isAdminRole], userController.getUserRecord);

module.exports = router;
