import express from 'express';
import UserController from '../controllers/user.controller';
import validateSchema from '../validation/validation.middleware';
import userSchema from '../schema/user';
import routerLoger from '../middleware/router.loger';
import errorHandler from '../middleware/error.server';

const userController = new UserController();
const router = express.Router();

router.get('/:id', routerLoger, userController.get.bind(userController));
router.post('/', routerLoger, validateSchema(userSchema), userController.add.bind(userController));
router.put('/:id', routerLoger, validateSchema(userSchema), userController.update.bind(userController));
router.delete('/:id', routerLoger, userController.delete.bind(userController));
router.get('/', routerLoger, userController.list.bind(userController));
router.use(errorHandler);

export default router;
