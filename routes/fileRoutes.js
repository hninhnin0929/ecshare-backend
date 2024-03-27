// routes/fileRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const fileController = require('../controllers/fileController');
const validateToken = require("../middleware/validateTokenHandler");

const upload = multer();

router.use(validateToken);
router.post('/upload', upload.single('file'), fileController.uploadFile);
router.get('/', fileController.getFileList);

module.exports = router;
