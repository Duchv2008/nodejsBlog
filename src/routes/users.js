import { Router } from 'express';
import controller from '../controllers/users_controller';
import authenticate from '../controllers/authenticate';
var router = Router();

router.get('/', controller.index);
router.get('/:id', authenticate.isAuthenticated, controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.destroy);

export default router;
