const express = require("express");

const userControllers = require("../controllers/userController");
const adminControllers = require("../controllers/adminController");

const router = express.Router();

router.post("/userRegister", userControllers.userRegister);
router.post("/adminRegister", userControllers.adminRegister);
router.post("/signin", userControllers.signin);
router.get("/user/logout", userControllers.logout);

// router.post("/user/myPage", userControllers.myPage);
router.post("/user/myPage/create", userControllers.createMyPage);
router.post("/user/myPage/add",userControllers.addVehicle);
router.get("/user/myPage", userControllers.getVehicle)

router.post("/admin/userPage", adminControllers.userPage);

module.exports = router;