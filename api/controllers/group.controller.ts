import { Request, Response, NextFunction } from 'express';
import GroupService from '../secvices/group.service';

class GroupController {
    public async get(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const groupService = new GroupService();

            const group = await groupService.getById(id);

            res.json(group);
        } catch (error) {
            return next(error);
        }
    }

    public async add(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { body } = req;
            const groupService = new GroupService();

            const group = await groupService.create(body);

            res.json(group);
        } catch (error) {
            return next(error);
        }
    }

    public async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const { body } = req;
            const groupService = new GroupService();

            const group = await groupService.update(id, body);

            res.json(group);
        } catch (error) {
            return next(error);
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const groupService = new GroupService();

            const group = await groupService.delete(id);

            res.json(group);
        } catch (error) {
            return next(error);
        }
    }

    public async addUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { body: {
                groupId,
                usersId
            } } = req;

            const groupService = new GroupService();

            await groupService.addUsersToGroup(groupId, usersId);

            res.json({
                test: 'aaa'
            });
        } catch (error) {
            return next(error);
        }
    }
}

const groupController = new GroupController();

export default groupController;
