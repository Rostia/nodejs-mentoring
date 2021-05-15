import express from 'express';
import UserController from '../controllers/user.controller';
import validateSchema from '../validation/validation.middleware';
import userSchema from '../schema/user';
import routerLoger from '../middleware/router.loger';
import errorHandler from '../middleware/error.server';

const router = express.Router();

router.get('/:id', routerLoger, UserController.get);
router.post('/', routerLoger, validateSchema(userSchema), UserController.add);
router.put('/:id', routerLoger, validateSchema(userSchema), UserController.update);
router.delete('/:id', routerLoger, UserController.delete);
router.get('/', routerLoger, UserController.list);
router.use(errorHandler);

export default router;
