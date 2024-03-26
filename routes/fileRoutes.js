// routes/fileRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const fileController = require('../controllers/fileController');

const upload = multer();

router.post('/upload', upload.single('file'), fileController.uploadFile);

module.exports = router;
