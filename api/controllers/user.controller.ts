import { Request, Response, NextFunction } from 'express';
import UserService from '../secvices/user.service';
import measure from '../utils/mesure.decorator';

class UserController {
    userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    @measure
    public async get(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;

            const user = await this.userService.getById(+id);

            res.json(user);
        } catch (error) {
            return next(error);
        }
    }

    public async add(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { body } = req;

            const user = await this.userService.create(body);

            res.status(201).json(user);
        } catch (error) {
            return next(error);
        }
    }

    public async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const { body } = req;

            const user = await this.userService.update(+id, body);

            res.json(user);
        } catch (error) {
            return next(error);
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;

            const user = await this.userService.delete(+id);

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

            const users = await this.userService.search(login?.toString(), +limit);
            console.log('test');


            res.json(users);
        } catch (error) {
            return next(error);
        }
    }
}

export default UserController;
