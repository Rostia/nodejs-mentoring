import { Request, Response } from 'express';
import user from '../modules/user';

const ERROR_MESSAGE_404 = 'User not found!';

class UserController {
    get(req: Request, res: Response) {
        const { id } = req.params;
        const result = user.get(id);

        if (!result) {
            return res.status(404).end(ERROR_MESSAGE_404);
        }

        res.json(result);
    }

    add(req: Request, res: Response) {
        const { body } = req;

        res.json(user.add(body));
    }

    update(req: Request, res: Response) {
        const { id } = req.params;
        const { body } = req;

        if (!user.exist(id)) {
            return res.status(404).end(ERROR_MESSAGE_404);
        }

        res.json(user.update(id, body));
    }

    delete(req: Request, res: Response) {
        const { id } = req.params;

        if (!user.exist(id)) {
            return res.status(404).end(ERROR_MESSAGE_404);
        }

        res.json(user.delete(id));
    }

    list(req: Request, res: Response) {
        const { login } = req.query;
        const limit = Number(req.query.limit);

        if (isNaN(limit)) {
            return res.status(400).end('limit: should be a number');
        }

        res.json(user.getAutoSuggestUsers(login?.toString(), Number(limit)));
    }
}

const userController = new UserController();

export default userController;
