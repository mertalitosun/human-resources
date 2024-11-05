const express = require("express")
const router = express.Router();
const userController = require("../controllers/user");

const {body} = require("express-validator"); //validator
const {isAuth, isRole} = require("../middlewares/auth");
const {upload} = require("../helpers/multer");



/**
 * @swagger
 * tags:
 *   name: User
 *   description: 3. Parti kullanıcılar ve insan kaynakları işlemleri
 */


/**
 * @swagger
 * /api/v1/documents:
 *   patch:
 *     tags:
 *          - User
 *     summary: Döküman durumu güncelle
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *               documentId:
 *                 type: integer
 *               rejection_reason:
 *                 type: string
 *     responses:
 *       200:
 *         description: Evrak durumu başarıyla güncellendi.
 *       403:
 *         description: Bu İşlem İçin Yetkiniz Yok!
 *       404:
 *         description: Dosya bulunamadı.
 *       500:
 *         description: Sunucu hatası
 */
router.patch("/api/v1/documents",isAuth,isRole(["İnsan Kaynakları","Admin"]),userController.patch_document_status);

/**
 * @swagger
 * /api/v1/documents/{documentId}:
 *   delete:
 *     tags:
 *       - User
 *     summary: Dosya sil
 *     description: Sistemden belirtilen dosyayı siler.
 *     parameters:
 *       - name: documentId
 *         in: path
 *         required: true
 *         description: Silinecek dosyanın ID'si
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dosya başarıyla silindi.
 *       403:
 *         description: Bu belgeyi silmeye yetkiniz yok!
 *       404:
 *         description: Dosya bulunamadı!
 *       500:
 *         description: Sunucu hatası.
 */
router.delete("/api/v1/documents/:documentId",isAuth,isRole(["3. Parti Firma Kullanıcısı","Admin"]),userController.delete_documents);

/**
 * @swagger
 * /api/v1/documents:
 *   post:
 *     tags:
 *       - User
 *     summary: Dosya kayıt
 *     description: Sisteme yeni dosya kayıt eder.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data: 
 *           schema:
 *             type: object
 *             properties:
 *               workerId:
 *                 type: integer
 *                 description: İşçinin ID'si.
 *               document:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary 
 *                 description: Yüklenecek belgeler.
 *     responses:
 *       201:
 *         description: Belgeler başarıyla yüklendi.
 *       403:
 *         description: Bu işçiye belge ekleme yetkiniz yok!
 *       404:
 *         description: İşçi bulunamadı!
 *       500:
 *         description: Sunucu hatası.
 */
router.post("/api/v1/documents", isAuth, isRole(["3. Parti Firma Kullanıcısı", "Admin"]), upload.array("document"), userController.post_documents);


/**
 * @swagger
 * /api/v1/workers/{workerId}/documents:
 *   get:
 *     tags:
 *       - User
 *     summary: Belirli bir işçinin belgelerini al
 *     description: Verilen işçi ID'sine göre belgeleri döndürür.
 *     parameters:
 *       - name: workerId
 *         in: path
 *         required: true
 *         description: Belgelerini almak istediğiniz işçinin ID'si.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Belgeler başarıyla alındı.
 *       404:
 *         description: Belirtilen işçi bulunamadı.
 *       500:
 *         description: Sunucu hatası.
 */
router.get("/api/v1/workers/:workerId/documents", isAuth, userController.get_documents);

/**
 * @swagger
 * /api/v1/workers/{workerId}:
 *   put:
 *     tags:
 *       - User
 *     summary: İşçi bilgilerini güncelle
 *     description: Belirtilen işçinin bilgilerini günceller.
 *     parameters:
 *       - name: workerId
 *         in: path
 *         required: true
 *         description: Güncellenecek işçinin ID'si.
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
 *               identity_no:
 *                 type: string
 *     responses:
 *       200:
 *         description: İşçi bilgileri başarıyla güncellendi.
 *       403:
 *         description: Bu işçiyi güncellemeye yetkiniz yok!
 *       404:
 *         description: İşçi bulunamadı.
 *       500:
 *         description: Sunucu hatası.
 */
router.put("/api/v1/workers/:workerId",isAuth,isRole(["3. Parti Firma Kullanıcısı","Admin"]),userController.put_workers);

/**
 * @swagger
 * /api/v1/workers/{workerId}:
 *   delete:
 *     tags:
 *       - User
 *     summary: İşçiyi sil
 *     description: Sistemden belirtilen işçiyi siler.
 *     parameters:
 *       - name: workerId
 *         in: path
 *         required: true
 *         description: Silinecek işçinin ID'si.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: İşçi başarıyla silindi.
 *       403:
 *         description: Bu işçiyi silmeye yetkiniz yok!
 *       404:
 *         description: İşçi bulunamadı.
 *       500:
 *         description: Sunucu hatası.
 */
router.delete("/api/v1/workers/:workerId",isAuth,isRole(["3. Parti Firma Kullanıcısı","Admin"]),userController.delete_workers);

/**
 * @swagger
 * /api/v1/workers:
 *   post:
 *     tags:
 *       - User
 *     summary: Yeni işçi kaydı
 *     description: Sisteme yeni bir işçi kaydeder.
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
 *               identity_no:
 *                 type: string
 *     responses:
 *       201:
 *         description: İşçi başarıyla kaydedildi.
 *       400:
 *         description: Bu işçi zaten kayıtlı.
 *       500:
 *         description: Sunucu hatası.
 */
router.post("/api/v1/workers",
[
    body("name").notEmpty().withMessage("Ad alanı boş bırakılamaz"),
    body("surname").notEmpty().withMessage("Soyad alanı boş bırakılamaz"),
    body("email").notEmpty().withMessage("E-posta alanı boş bırakılamaz"),
    body("identity_no").notEmpty().withMessage("TC alanı boş bırakılamaz"),
]
,isAuth,isRole(["3. Parti Firma Kullanıcısı","Admin"]),userController.post_workers);

/**
 * @swagger
 * /api/v1/workers:
 *   get:
 *     tags:
 *       - User
 *     summary: Tüm işçilerin listesini al
 *     description: Sistemdeki tüm işçilerin listesini döndürür.
 *     responses:
 *       200:
 *         description: İşçiler başarıyla alındı.
 *       500:
 *         description: Sunucu hatası.
 */
router.get("/api/v1/workers",isAuth,isRole(["Admin","3. Parti Firma Kullanıcısı"]),userController.get_workers);

module.exports = router;
