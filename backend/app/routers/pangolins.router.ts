import { Router } from 'express';
import PangolinsController from '../controllers/PangolinsController';
import { auth } from '../middlewares/auth';

const router: Router = Router();

router.route('/').get(auth, PangolinsController.getAll);

export default router;
