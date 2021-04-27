import { Request, Response } from 'express';
import UserService from '../secvices/user.service';

class UserController {
    public async get(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const user = new UserService();

        const result = await user.getById(+id);

        res.json(result);
    }

    public async add(req: Request, res: Response): Promise<void> {
        const { body } = req;
        const user = new UserService();

        const result = await user.create(body);

        res.json(result);
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { body } = req;
        const user = new UserService();

        const result = await user.update(+id, body);

        res.json(result);
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const user = new UserService();

        const result = await user.delete(+id);

        res.json(result);
    }

    public async list(req: Request, res: Response): Promise<void> {
        const {
            login = '',
            limit = 5
        } = req.query;
        const user = new UserService();

        const results = await user.search(login?.toString(), +limit);

        res.json(results);
    }
}

const userController = new UserController();

export default userController;
