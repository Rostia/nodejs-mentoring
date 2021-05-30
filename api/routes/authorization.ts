import express from 'express';
import AuthorizationController from '../controllers/authorization.controller';
import routerLoger from '../middleware/router.loger';
import errorHandler from '../middleware/error.server';

const router = express.Router();

router.get('/login', routerLoger, AuthorizationController.login);
router.use(errorHandler);

export default router;
