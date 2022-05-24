import express from 'express';

import Controller from '../controller/servers.controller';
import { Cache } from '../middleware/cache.middleware';

const router = express.Router();

router.route('/')
  .get(
    Cache(2 * 60),
    Controller.findAll,
  );

export default router;
