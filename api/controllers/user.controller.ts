import { Request, Response } from 'express';
import UserService from '../secvices/user.service';

class UserController {
    userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    public async get(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        const user = await this.userService.getById(+id);

        res.json(user);
    }

    public async add(req: Request, res: Response): Promise<void> {
        const { body } = req;

        const user = await this.userService.create(body);

        res.json(user);
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { body } = req;

        const user = await this.userService.update(+id, body);

        res.json(user);
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        const user = await this.userService.delete(+id);

        res.json(user);
    }

    public async list(req: Request, res: Response): Promise<void> {
        const {
            login = '',
            limit = 5
        } = req.query;

        const users = await this.userService.search(login?.toString(), +limit);

        res.json(users);
    }
}

export default UserController;
