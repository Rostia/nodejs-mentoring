import express from 'express';
import users from './users';
import groups from './groups';
import errorServerHandler from '../middleware/error.server';


const router = express.Router();

router.use('/users', users);
router.use('/groups', groups);
router.use(errorServerHandler);

export default router;
