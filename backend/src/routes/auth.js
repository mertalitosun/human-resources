const express = require("express")
const router = express.Router();

const authController = require("../controllers/auth");

const {body} = require("express-validator"); //validator
const {isAuth, isRole} = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Oturum açma ve kaydolma işlemleri 
 */

/**
 * @swagger
 * /api/v1/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Kayıt olma işlemi
 *     description: Yeni bir kullanıcı kaydeder.
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
 *     responses:
 *       201:
 *         description: Kullanıcı başarıyla kaydedildi.
 *       404:
 *         description: Admin Rolü veya Kullanıcı Rolü Bulunamadı.
 *       500:
 *         description: Sunucu hatası.
 */
router.post("/api/v1/register",
    [
        body("name").notEmpty().withMessage("Ad alanı boş bırakılamaz"),
        body("surname").notEmpty().withMessage("Soyad alanı boş bırakılamaz"),
        body("email").notEmpty().withMessage("E-posta alanı boş bırakılamaz"),
        body("password").notEmpty().withMessage("Şifre alanı boş bırakılamaz"),
    ],
authController.post_register);

/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Giriş yapma işlemi
 *     description: Sisteme giriş yapar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Giriş başarılı.
 *       401:
 *         description: Hatalı parola.
 *       404:
 *         description: Girilen e-posta adresine kayıtlı kullanıcı bulunamadı.
 *       500:
 *         description: Sunucu hatası.
 */
router.post("/api/v1/login",
    [
        body("email").notEmpty().withMessage("E-posta alanı boş bırakılamaz"),
        body("password").notEmpty().withMessage("Şifre alanı boş bırakılamaz"),
    ],
authController.post_login);


/**
 * @swagger
 * /api/v1/forgot-password:
 *  post:
 *      tags:
 *         - Auth
 *      summary: Şifremi unuttum
 *      description: Girilen E-Posta adresine yeni şifre gönderir
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *      responses:
 *          200: 
 *              description: Yeni şifre e-posta adresine gönderildi.
 *          404:
 *              description: Girilen e-posta adresine kayıtlı kullanıcı bulunamadı.
 *          500:
 *              description: Sunucu Hatası.
 */
router.post("/api/v1/forgot-password",[body("email").notEmpty().withMessage("E-posta alanı boş bırakılamaz"),],authController.post_forgot_password);


/**
 * @swagger
 * /api/v1/change-password:
 *  post:
 *      tags:
 *         - Auth
 *      summary: Şifre yenile
 *      description: Kullanıcı şifresini yeniler
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          currentPassword:
 *                              type: string
 *                          newPassword:
 *                              type: string
 *      responses:
 *          200: 
 *              description: Şifre başarıyla değiştirildi.
 *          401:
 *              description: Kullanıcı bulunamadı ya da hatalı eski şifre.
 */
router.post("/api/v1/change-password",
    [
        body("currentPassword").notEmpty().withMessage("Mevcut şifre alanı boş bırakılamaz"),
        body("newPassword").notEmpty().withMessage("Yeni şifre alanı boş bırakılamaz"),
],isAuth,authController.post_change_password);

/**
 * @swagger
 * /api/v1/logout:
 *  get:
 *      tags:
 *         - Auth
 *      summary: Çıkış yap
 *      description: Kullanıcı çıkış yapar
 *      responses:
 *          200: 
 *              description: Başarıyla çıkış yapıldı.
 */

router.get("/api/v1/logout", authController.get_logout);


module.exports = router;