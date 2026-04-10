import { body, validationResult } from "express-validator";



function validateRequest(req, res, next) {
  const errors = validationResult(req); 
    if (!errors.isEmpty()) {                
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

export const validateRegisterUser = [
  body("email").isEmail().withMessage("Invalid email address").normalizeEmail(),
  body("contact")
    .notEmpty()
    .isLength({ min: 10, max: 15 })
    .matches(/^[0-9]+$/)
    .withMessage(
      "Contact number must contain only digits and be between 10 and 15 characters",
    ),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("fullname")
    .notEmpty()
    .isLength({ min: 3, max: 100 })
    .withMessage("Full name must be between 2 and 100 characters"),
   body("isSeller")
        .isBoolean().withMessage("isSeller must be a boolean value"),

    validateRequest,
];

export const validateLogin = [
  body("email").isEmail().normalizeEmail(),
  body("password").isLength({ min: 6 }),
  validateRequest,
];
