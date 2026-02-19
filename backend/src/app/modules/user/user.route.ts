import { Router } from 'express';
import auth from '../../middlewares/auth';
import { ALL_ADMINISTRATOR_LEVELS, ALL_ROLES } from '../../utils/constant';
import userController from './user.controller';

const router = Router();
router.put('/', auth(...ALL_ROLES), userController.updateUserProfile);

router.get('/current', auth(...ALL_ROLES), userController.getCurrentUser);

router.get('/recent', auth(...ALL_ADMINISTRATOR_LEVELS), userController.getRecentUsers);

const userRouter = router;

export default userRouter;
