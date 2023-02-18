import { Router } from 'express';

import viewRouteHandler from './view';

const router: Router = Router();

router.use('/view', viewRouteHandler);

export default router;