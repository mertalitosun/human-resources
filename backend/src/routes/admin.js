const express = require("express")
const router = express.Router();

const adminController = require("../controllers/admin");

const {body} = require("express-validator"); //validator

const {isAuth, isRole} = require("../middlewares/auth");


/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin işlemleri ve kullanıcı yönetimi
 */

/**
 * @swagger
 * /api/v1/roles:
 *   get:
 *     tags: 
 *          - Admin
 *     summary: Tüm rollerin listesini getir
 *     responses:
 *       200:
 *         description: Roller başarıyla alındı.
 *       500:
 *         description: Sunucu Hatası
 */
router.get("/api/v1/roles",isAuth,isRole("Admin"),adminController.get_roles);


/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     tags:
 *          - Admin
 *     summary: Tüm kullanıcıların listesini getir
 *     responses:
 *       200:
 *         description: Kullanıcılar başarıyla alındı.
 *       500:
 *         description: Sunucu hatası
 */
router.get("/api/v1/users",isAuth,isRole("Admin"),adminController.get_users);


/**
 * @swagger
 * /api/v1/users/{userId}:
 *   put:
 *     tags:
 *          - Admin
 *     summary: Kullanıcı bilgilerini güncelle
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: Güncellenecek kullanıcının ID'si
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               surname:
 *                 type: string
 *               email:
 *                 type: string
 *               roleId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Kullanıcı başarıyla güncellendi.
 *       403:
 *         description: Bu kullanıcıyı güncelleme yetkiniz yok!
 *       404:
 *         description: Kullanıcı bulunamadı!
 *       500:
 *         description: Sunucu hatası.
 */
router.put("/api/v1/users/:userId",isAuth,isRole(["Admin","3. Parti Firma Kullanıcısı"]),adminController.put_users);

/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     tags:
 *       - Admin
 *     summary: Kullanıcı kayıt
 *     description: Sisteme yeni kullanıcı kayıt eder.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               surname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               roleId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Kayıt başarılı, yeni kullanıcıya e-posta gönderildi.
 *       400:
 *         description: Bu e-posta adresi zaten kayıtlı.
 *       500:
 *         description: Sunucu hatası.
 */
router.post("/api/v1/users",
    [
        body("name").notEmpty().withMessage("Ad alanı boş bırakılamaz"),
        body("surname").notEmpty().withMessage("Soyad alanı boş bırakılamaz"),
        body("email").notEmpty().withMessage("E-posta alanı boş bırakılamaz"),
        body("password").notEmpty().withMessage("Şifre alanı boş bırakılamaz"),
    ],
isAuth,isRole("Admin"),adminController.post_users);

/**
 * @swagger
 * /api/v1/users/{userId}:
 *   delete:
 *     tags:
 *       - Admin
 *     summary: Kullanıcı sil
 *     description: Sistemden kullanıcı siler.
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: Silinecek kullanıcının ID'si
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Kullanıcı başarıyla silindi.
 *       403:
 *         description: Admin rolüne sahip kullanıcılar silinemez.
 *       404:
 *         description: Kullanıcı bulunamadı!
 *       500:
 *         description: Sunucu hatası.
 */
router.delete("/api/v1/users/:userId",isAuth,isRole("Admin"),adminController.delete_users);
module.exports = router;
