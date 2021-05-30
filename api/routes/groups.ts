import { Router } from 'express';
import GroupController from '../controllers/group.controller';
import routerLoger from '../middleware/router.loger';
import authMiddleware from '../middleware/auth';

const router = Router();

router.get('/:id', routerLoger, authMiddleware, GroupController.get);
router.post('/', routerLoger, authMiddleware, GroupController.add);
router.put('/:id', routerLoger, authMiddleware, GroupController.update);
router.delete('/:id', routerLoger, authMiddleware, GroupController.delete);
router.post('/users', routerLoger, authMiddleware, GroupController.addUser);

export default router;
