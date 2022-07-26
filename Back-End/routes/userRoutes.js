const express = require("express");

const userControllers = require("../controllers/userController");

const router = express.Router();

router.post("/userRegister", userControllers.userRegister);
router.post("/adminRegister", userControllers.adminRegister);
router.post("/signin", userControllers.signin);
router.get("/user/logout", userControllers.logout);

router.post("/user/myPage", userControllers.myPage);
router.post("/user/myPage/create", userControllers.createMyPage);

module.exports = router;