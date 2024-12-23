const express = require('express');
const { getProfiles, createProfile, updateProfile, deleteProfile } = require('../controllers/profileController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Define CRUD routes
router.get('/', authMiddleware, getProfiles);
router.post('/', authMiddleware, createProfile);
router.put('/:id', authMiddleware, updateProfile); // Ensure this route exists
router.delete('/:id', authMiddleware, deleteProfile);

module.exports = router;