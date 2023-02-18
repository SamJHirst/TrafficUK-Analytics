import { Request, Response, Router } from 'express';

import ViewController from '../controllers/ViewController';

const router: Router = Router();

export async function logPageView(req: Request, res: Response): Promise<Response> {
    await ViewController.logPageView(req.body.cookieId ?? null, req.body.path, req.body.sessionId);

    return res.sendStatus(204);
}

/**
 * @api {post} /v1-beta/view Log a page view
 * @apiName Log page view
 * @apiGroup Analytics
 * @apiVersion 0.1.0
 * @apiBody {String} [cookieId] The cookie ID associated with the page view.
 * @apiBody {String} path The path name of the page which was accessed.
 * @apiBody {String} sessionId The session ID associated with the page view.
 * @apiSuccess (204 No Content - Request successful) - The image was retrieved successfully
*/
router.post('/', logPageView);

export default router;
