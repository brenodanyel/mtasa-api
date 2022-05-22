import express from 'express';

import controller from '../controller/server.controller';
import middleware from '../middleware/server.middleware';

const router = express.Router();

router.route('/')
  .get(...middleware.fetchServer, controller.fetchServer);

export default router;
