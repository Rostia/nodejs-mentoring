import { Router } from 'express';
import GroupController from '../controllers/group.controller';

const router = Router();

router.get('/:id', GroupController.get);
router.post('/', GroupController.add);
router.put('/:id', GroupController.update);
router.delete('/:id', GroupController.delete);
router.post('/users', GroupController.addUser);

export default router;
