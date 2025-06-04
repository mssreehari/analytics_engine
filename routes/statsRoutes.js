const express = require('express');
const { getStats } = require('../controllers/statsController'); // ✅ FIXED
const router = express.Router();

router.get('/', getStats); // ✅ use controller function

module.exports = router;
