const express = require('express')
const {homeView, generatePdf} = require('../controllers/homeController')

const router = express.Router();

router.get('/', homeView);
router.get('/download', generatePdf)

module.exports = router