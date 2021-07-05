import express from 'express';
import AuthorizationController from '../controllers/authorization.controller';
import routerLoger from '../middleware/router.loger';
import errorHandler from '../middleware/error.server';

const router = express.Router();
const authController = new AuthorizationController();

router.get('/login', routerLoger, authController.login.bind(authController));
router.use(errorHandler);

export default router;
