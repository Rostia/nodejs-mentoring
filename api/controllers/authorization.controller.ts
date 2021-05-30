import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UserService from '../secvices/user.service';

const {
    JWT_SECRET
} = process.env;

class AuthorizationController {
    public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {
                login,
                password
            } = req.body;
            const userService = new UserService();

            const user = await userService.getByLogAndPass(login, password);
            const {
                id,
                isDeleted
            } = user;

            const token = jwt.sign({
                id,
                login,
                isDeleted,
                exp: Math.floor(Date.now() / 1000) + (60 * 60)
            }, JWT_SECRET);

            res.json(token);
        } catch (error) {
            return next(error);
        }
    }
}

const authorizationController = new AuthorizationController();

export default authorizationController;
