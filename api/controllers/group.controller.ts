import { Request, Response } from 'express';
import GroupService from '../secvices/group.service';

class GroupController {
    private groupService: GroupService;

    constructor() {
        this.groupService = new GroupService();
    }

    public async get(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        const group = await this.groupService.getById(id);

        res.json(group);
    }

    public async add(req: Request, res: Response): Promise<void> {
        const { body } = req;

        const group = await this.groupService.create(body);

        res.json(group);
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { body } = req;

        const group = await this.groupService.update(id, body);

        res.json(group);
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        const group = await this.groupService.delete(id);

        res.json(group);
    }

    public async addUser(req: Request, res: Response): Promise<void> {
        const { body: {
            groupId,
            usersId
        } } = req;

        await this.groupService.addUsersToGroup(groupId, usersId);

        res.json({});
    }
}

export default GroupController;
