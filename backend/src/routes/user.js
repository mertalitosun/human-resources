const express = require("express")
const router = express.Router();
const userController = require("../controllers/user");

const {body} = require("express-validator"); //validator

const {isAuth, isRole} = require("../middlewares/auth");

const upload = require("../helpers/multer");


router.get("/api/v1/workers/:workerId/documents",isAuth,userController.get_documents);
router.put("/api/v1/workers/:workerId",isAuth,isRole("3. Parti Firma Kullanıcısı"),userController.put_workers);
router.delete("/api/v1/workers/:workerId",isAuth,isRole("3. Parti Firma Kullanıcısı"),userController.delete_workers);

router.post("/api/v1/workers",
[
    body("name").notEmpty().withMessage("Ad alanı boş bırakılamaz"),
    body("surname").notEmpty().withMessage("Soyad alanı boş bırakılamaz"),
    body("email").notEmpty().withMessage("E-posta alanı boş bırakılamaz"),
    body("identity_no").notEmpty().withMessage("TC alanı boş bırakılamaz"),
]
,isAuth,isRole("3. Parti Firma Kullanıcısı"),userController.post_workers);

router.get("/api/v1/workers",isAuth,isRole(["Admin","3. Parti Firma Kullanıcısı","İnsan Kaynakları"]),userController.get_workers);

module.exports = router;
