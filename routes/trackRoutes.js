const express = require('express');
const { trackEvent } = require('../controllers/trackController');
const router = express.Router();

router.post('/', trackEvent);

module.exports = router;
