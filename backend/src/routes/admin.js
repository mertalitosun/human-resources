const express = require("express")
const router = express.Router();

const adminController = require("../controllers/admin");

const {body} = require("express-validator"); //validator

const {isAuth, isRole} = require("../middlewares/auth");

router.get("/api/v1/roles",isAuth,isRole("Admin"),adminController.get_roles);



router.get("/api/v1/users",isAuth,isRole("Admin"),adminController.get_users);

router.put("/api/v1/users/:userId",isAuth,isRole("Admin"),adminController.put_users);

router.post("/api/v1/users",
    [
        body("name").notEmpty().withMessage("Ad alanı boş bırakılamaz"),
        body("surname").notEmpty().withMessage("Soyad alanı boş bırakılamaz"),
        body("email").notEmpty().withMessage("E-posta alanı boş bırakılamaz"),
        body("password").notEmpty().withMessage("Şifre alanı boş bırakılamaz"),
    ],
isAuth,isRole("Admin"),adminController.post_users);

router.delete("/api/v1/users/:userId",isAuth,isRole("Admin"),adminController.delete_users);
module.exports = router;
