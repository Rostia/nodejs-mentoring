import { Router } from 'express';
import GroupController from '../controllers/group.controller';
import routerLoger from '../middleware/router.loger';
import authMiddleware from '../middleware/auth';

const groupController = new GroupController();

const router = Router();

router.get('/:id', routerLoger, authMiddleware, groupController.get.bind(groupController));
router.post('/', routerLoger, authMiddleware, groupController.add.bind(groupController));
router.put('/:id', routerLoger, authMiddleware, groupController.update.bind(groupController));
router.delete('/:id', routerLoger, authMiddleware, groupController.delete.bind(groupController));
router.post('/users', routerLoger, authMiddleware, groupController.addUser.bind(groupController));

export default router;
