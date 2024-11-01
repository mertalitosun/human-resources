const express = require("express")
const router = express.Router();

const authController = require("../controllers/auth");

const {body} = require("express-validator"); //validator

router.post("/api/v1/register",
    [
        body("name").notEmpty().withMessage("Ad alanı boş bırakılamaz"),
        body("surname").notEmpty().withMessage("Soyad alanı boş bırakılamaz"),
        body("email").notEmpty().withMessage("E-posta alanı boş bırakılamaz"),
        body("password").notEmpty().withMessage("Şifre alanı boş bırakılamaz"),
    ],
authController.post_register);

router.post("/api/v1/login",
    [
        body("email").notEmpty().withMessage("E-posta alanı boş bırakılamaz"),
        body("password").notEmpty().withMessage("Şifre alanı boş bırakılamaz"),
    ],
authController.post_login);

router.post("/api/v1/forgot-password",
    [
        body("email").notEmpty().withMessage("E-posta alanı boş bırakılamaz"),
    ],
authController.post_forgot_password);

router.post("/api/v1/change-password",
    [
        body("currentPassword").notEmpty().withMessage("Mevcut şifre alanı boş bırakılamaz"),
        body("newPassword").notEmpty().withMessage("Yeni şifre alanı boş bırakılamaz"),
],authController.post_change_password);
    
router.get("/api/v1/logout", authController.get_logout);


module.exports = router;