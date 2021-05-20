import express from 'express';
import UserController from '../controllers/user.controller';
import validateSchema from '../validation/validation.middleware';
import userSchema from '../schema/user';

const userController = new UserController();
const router = express.Router();

router.get('/:id', userController.get.bind(userController));
router.post('/', validateSchema(userSchema), userController.add.bind(userController));
router.put('/:id', validateSchema(userSchema), userController.update.bind(userController));
router.delete('/:id', userController.delete.bind(userController));
router.get('/', userController.list.bind(userController));

export default router;
