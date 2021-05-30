import { Request, Response, NextFunction } from 'express';
import GroupService from '../secvices/group.service';

class GroupController {
    private groupService: GroupService;

    constructor() {
        this.groupService = new GroupService();
    }

    public async get(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;

            const group = await this.groupService.getById(id);

            res.json(group);
        } catch (error) {
            return next(error);
        }
    }

    public async add(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { body } = req;

            const group = await this.groupService.create(body);

            res.json(group);
        } catch (error) {
            return next(error);
        }
    }

    public async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const { body } = req;

            const group = await this.groupService.update(id, body);

            res.json(group);
        } catch (error) {
            return next(error);
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;

            const group = await this.groupService.delete(id);

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

            await this.groupService.addUsersToGroup(groupId, usersId);

            res.json({});
        } catch (error) {
            return next(error);
        }
    }
}

const groupController = new GroupController();

export default groupController;
