const express = require("express")
const router = express.Router();

const authController = require("../controllers/auth");

router.post("/api/v1/register", authController.post_register);

router.post("/api/v1/login", authController.post_login);

router.get("/api/v1/logout", authController.get_logout);


module.exports = router;