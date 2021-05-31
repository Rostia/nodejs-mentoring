import { Router } from 'express';
import GroupController from '../controllers/group.controller';
import routerLoger from '../middleware/router.loger';

const groupController = new GroupController();

const router = Router();

router.get('/:id', routerLoger, groupController.get.bind(groupController));
router.post('/', routerLoger, groupController.add.bind(groupController));
router.put('/:id', routerLoger, groupController.update.bind(groupController));
router.delete('/:id', routerLoger, groupController.delete.bind(groupController));
router.post('/users', routerLoger, groupController.addUser.bind(groupController));

export default router;
