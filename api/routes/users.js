import express from 'express';
import UserController from '../controllers/user.controller';
import validateSchema from '../validation/validation.middleware';
import userSchema from '../schema/user';

const router = express.Router();

router.get('/:id', UserController.get);
router.post('/', validateSchema(userSchema), UserController.add);
router.put('/:id', validateSchema(userSchema), UserController.update);
router.delete('/:id', UserController.delete);
router.get('/', UserController.list);

export default router;
