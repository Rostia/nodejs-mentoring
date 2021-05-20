import { Router } from 'express';
import GroupController from '../controllers/group.controller';

const groupController = new GroupController();

const router = Router();

router.get('/:id', groupController.get.bind(groupController));
router.post('/', groupController.add.bind(groupController));
router.put('/:id', groupController.update.bind(groupController));
router.delete('/:id', groupController.delete.bind(groupController));
router.post('/users', groupController.addUser.bind(groupController));

export default router;
