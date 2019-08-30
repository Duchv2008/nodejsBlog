import { Router } from 'express';
import controller from '../controllers/sessions_controller';
import authenticate from '../controllers/authenticate';
var router = Router();

router.post('/login', controller.create);
router.delete('/logout', authenticate.isAuthenticated, controller.destroy);
router.post('/refresh_token', controller.refreshToken);

export default router;
