import { Router } from 'express';
import SignUpController from '../controllers/SignUpController';

const router: Router = Router();

router.route('/').post(SignUpController.signUp);

router.route('/:property/:value').get(SignUpController.getPropertyAvailability);

export default router;
