import { Router } from 'express';
import GroupController from '../controllers/group.controller';
import routerLoger from '../middleware/router.loger';

const router = Router();

router.get('/:id', routerLoger, GroupController.get);
router.post('/', routerLoger, GroupController.add);
router.put('/:id', routerLoger, GroupController.update);
router.delete('/:id', routerLoger, GroupController.delete);
router.post('/users', routerLoger, GroupController.addUser);

export default router;
