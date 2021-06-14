import { Router } from 'express';
import ProfileController from '../controllers/ProfileController';

const router: Router = Router();

router.route('/:id').get(ProfileController.getById);

router.route('/:id/edit').get(ProfileController.getById).patch(ProfileController.update);

router.route('/:id/add').post(ProfileController.updateFriends);

router.route('/:id/delete').patch(ProfileController.removeFriends);

export default router;
