import { Request, Response, NextFunction } from 'express';
import UserService from '../secvices/user.service';

class UserController {
    public async get(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const userService = new UserService();

            const user = await userService.getById(+id).catch(next);

            res.json(user);
        } catch (error) {
            return next(error);
        }
    }

    public async add(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { body } = req;
            const userService = new UserService();

            const user = await userService.create(body);

            res.json(user);
        } catch (error) {
            return next(error);
        }
    }

    public async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const { body } = req;
            const userService = new UserService();

            const user = await userService.update(+id, body);

            res.json(user);
        } catch (error) {
            return next(error);
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const userService = new UserService();

            const user = await userService.delete(+id);

            res.json(user);
        } catch (error) {
            return next(error);
        }
    }

    public async list(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {
                login = '',
                limit = 5
            } = req.query;
            const userService = new UserService();

            const users = await userService.search(login?.toString(), +limit);

            res.json(users);
        } catch (error) {
            return next(error);
        }
    }
}

const userController = new UserController();

export default userController;
