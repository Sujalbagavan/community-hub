const { check } = require('express-validator');

exports.registerValidator = [
  check('name')
    .notEmpty().withMessage('Full name is required')
    .isLength({ max: 50 }).withMessage('Name cannot exceed 50 characters'),
  
  check('email')
    .isEmail().withMessage('Please enter a valid email')
    .normalizeEmail(),
    
  check('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    
  check('role')
    .optional()
    .isIn(['attendee', 'organizer']).withMessage('Invalid role specified')
];