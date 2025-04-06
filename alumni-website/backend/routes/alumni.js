const express = require('express');
const router = express.Router();
const alumniController = require('../controllers/alumni');
const authController = require('../controllers/auth');

// Public routes
router.get('/', alumniController.getAllAlumni);
router.get('/:id', alumniController.getAlumni);

// Protected routes
router.use(authController.protect);
router.patch('/update-profile', alumniController.updateProfile);

module.exports = router;