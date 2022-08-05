import express from 'express';

import { Controller } from '../controller/stats.controller';
import { Cache } from '../middleware/cache.middleware';

const router = express.Router();

router.route('/')
  .get(
    Cache(60),
    Controller.findStats,
  );

export default router;
