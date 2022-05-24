import { query } from 'express-validator';

export class Middleware {
  static findOne = [
    query('ip')
      .isString()
      .withMessage('"ip" is missing'),
    query('asePort')
      .exists()
      .withMessage('"asePort" is missing')
      .isNumeric()
      .withMessage('"asePort" should be a number')
      .isFloat({ min: 1, max: 65536 })
      .withMessage('"asePort" should be > 0 and < 65536'),
  ];
}
