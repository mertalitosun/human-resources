const express = require("express")
const router = express.Router();

const userController = require("../controllers/user");

const {body} = require("express-validator"); //validator

const {isAuth, isRole} = require("../middlewares/auth");

const upload = require("../helpers/multer");


router.post("/api/v1/workers",
[
    body("name").notEmpty().withMessage("Ad alanı boş bırakılamaz"),
    body("surname").notEmpty().withMessage("Soyad alanı boş bırakılamaz"),
    body("identity_no").notEmpty().withMessage("TC alanı boş bırakılamaz"),
]
,isAuth,isRole("3. Parti Firma Kullanıcısı"),userController.post_workers);


module.exports = router;
