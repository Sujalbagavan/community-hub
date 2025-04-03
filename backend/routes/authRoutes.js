const express = require('express');
const { check } = require('express-validator');
const { register } = require('../controllers/authController');

const router = express.Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 * 
 * @param {string} name - User's full name (required, max 50 chars)
 * @param {string} email - Valid email address (required)
 * @param {string} password - Password (required, min 6 chars)
 * @param {string} [role=attendee] - User role (attendee or organizer)
 */
const registerValidator = [
  // Name validation
  check('name')
    .trim()
    .notEmpty().withMessage('Full name is required')
    .isLength({ max: 50 }).withMessage('Name cannot exceed 50 characters')
    .matches(/^[a-zA-Z ]*$/).withMessage('Name can only contain letters and spaces'),

  // Email validation
  check('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email')
    .normalizeEmail(),

  // Password validation
  check('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
    .matches(/\d/).withMessage('Password must contain at least one number')
    .matches(/[a-zA-Z]/).withMessage('Password must contain at least one letter'),

  // Role validation
  check('role')
    .optional()
    .isIn(['attendee', 'organizer']).withMessage('Role must be either "attendee" or "organizer"')
];

// Register route
router.post('/register', registerValidator, register);

module.exports = router;