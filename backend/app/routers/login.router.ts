import { Router } from 'express';
import AuthController from '../controllers/AuthController';

const router: Router = Router();

router.route('/').post(AuthController.login);

export default router;
