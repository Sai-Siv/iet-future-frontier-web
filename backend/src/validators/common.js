import { body } from 'express-validator';

const MAX_TEXT_LENGTH = 5000;

export const requiredText = (field, label = field) =>
  body(field)
    .exists({ values: 'falsy' }).withMessage(`${label} is required`)
    .bail()
    .isString().withMessage(`${label} must be text`)
    .bail()
    .isLength({ max: MAX_TEXT_LENGTH }).withMessage(`${label} is too long`);

export const requiredEmail = (field, label = field) =>
  body(field)
    .exists({ values: 'falsy' }).withMessage(`${label} is required`)
    .bail()
    .isString().withMessage(`${label} must be a valid email address`)
    .bail()
    .trim()
    .isEmail().withMessage(`${label} must be a valid email address`);

export const optionalEmail = (field, label = field) =>
  body(field)
    .optional({ values: 'falsy' })
    .isString().withMessage(`${label} must be a valid email address`)
    .bail()
    .trim()
    .isEmail().withMessage(`${label} must be a valid email address`);
