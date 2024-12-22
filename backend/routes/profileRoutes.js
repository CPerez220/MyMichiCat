const express = require('express');
const { getProfiles, createProfile } = require('../controllers/profileController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Protect routes with authMiddleware
router.get('/', authMiddleware, getProfiles);
router.post('/', authMiddleware, createProfile);

module.exports = router;