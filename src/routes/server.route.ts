import express from 'express';

import { Controller } from '../controller/server.controller';
import { Middleware } from '../middleware/server.middleware';
import { ValidatorMiddleware } from '../middleware/validator.middleware';
import { Cache } from '../middleware/cache.middleware';

const router = express.Router();

router.route('/')
  .get(
    Cache(60),
    ...Middleware.findOne,
    ValidatorMiddleware.verify,
    Controller.findOne,
  );

export default router;
