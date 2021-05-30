import express from 'express';
import UserController from '../controllers/user.controller';
import validateSchema from '../validation/validation.middleware';
import userSchema from '../schema/user';
import routerLoger from '../middleware/router.loger';
import errorHandler from '../middleware/error.server';
import authMiddleware from '../middleware/auth';

const userController = new UserController();
const router = express.Router();

router.get('/:id', routerLoger, authMiddleware, userController.get.bind(userController));
router.post('/', routerLoger, validateSchema(userSchema), authMiddleware, userController.add.bind(userController));
router.put('/:id', routerLoger, validateSchema(userSchema), authMiddleware, userController.update.bind(userController));
router.delete('/:id', routerLoger, authMiddleware, userController.delete.bind(userController));
router.get('/', routerLoger, authMiddleware, userController.list.bind(userController));
router.use(errorHandler);

export default router;
