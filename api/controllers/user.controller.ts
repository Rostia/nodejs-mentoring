import { Request, Response } from 'express';
import UserService from '../secvices/user.service';

class UserController {
    public async get(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        const result = await UserService.getById(+id);

        res.json(result);
    }

    public async add(req: Request, res: Response): Promise<void> {
        const { body } = req;
        const result = await UserService.create(body);

        res.json(result);
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { body } = req;

        const result = await UserService.update(+id, body);

        res.json(result);
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        const result = await UserService.delete(+id);

        res.json(result);
    }

    public async list(req: Request, res: Response): Promise<void> {
        const {
            login = '',
            limit = 5
        } = req.query;

        const results = await UserService.search(login?.toString(), +limit);

        res.json(results);
    }
}

const userController = new UserController();

export default userController;
