import express from 'express';
import UserController from '../controllers/user.controller';
import validateSchema from '../validation/validation.middleware';
import userSchema from '../schema/user';
import routerLoger from '../middleware/router.loger';
import errorHandler from '../middleware/error.server';
import authMiddleware from '../middleware/auth';

const router = express.Router();

router.get('/:id', routerLoger, authMiddleware, UserController.get);
router.post('/', routerLoger, validateSchema(userSchema), authMiddleware, UserController.add);
router.put('/:id', routerLoger, validateSchema(userSchema), authMiddleware, UserController.update);
router.delete('/:id', routerLoger, authMiddleware, UserController.delete);
router.get('/', routerLoger, authMiddleware, UserController.list);
router.use(errorHandler);

export default router;
