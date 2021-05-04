import { Request, Response } from 'express';
import GroupService from '../secvices/group.service';

class GroupController {
    public async get(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const groupService = new GroupService();

        const group = await groupService.getById(id);

        res.json(group);
    }

    public async add(req: Request, res: Response): Promise<void> {
        const { body } = req;
        const groupService = new GroupService();

        const group = await groupService.create(body);

        res.json(group);
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { body } = req;
        const groupService = new GroupService();

        const group = await groupService.update(id, body);

        res.json(group);
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const groupService = new GroupService();

        const group = await groupService.delete(id);

        res.json(group);
    }

    public async addUser(req: Request, res: Response): Promise<void> {
        const { body: {
            groupId,
            usersId
        } } = req;

        const groupService = new GroupService();

        await groupService.addUsersToGroup(groupId, usersId);

        res.json({
            test: 'aaa'
        });
    }
}

const groupController = new GroupController();

export default groupController;
