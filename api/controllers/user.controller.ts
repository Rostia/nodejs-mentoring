import { Request, Response } from 'express';
import UserService from '../secvices/user.service';

class UserController {
    public async get(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const userService = new UserService();

        const user = await userService.getById(+id);

        res.json(user);
    }

    public async add(req: Request, res: Response): Promise<void> {
        const { body } = req;
        const userService = new UserService();

        const user = await userService.create(body);

        res.json(user);
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { body } = req;
        const userService = new UserService();

        const user = await userService.update(+id, body);

        res.json(user);
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const userService = new UserService();

        const user = await userService.delete(+id);

        res.json(user);
    }

    public async list(req: Request, res: Response): Promise<void> {
        const {
            login = '',
            limit = 5
        } = req.query;
        const userService = new UserService();

        const users = await userService.search(login?.toString(), +limit);

        res.json(users);
    }
}

const userController = new UserController();

export default userController;
