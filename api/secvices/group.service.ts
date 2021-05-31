import { Group, UserGroup } from '../models';
import sequelize from '../db/connect';
import CustomError from '../errors/custom.error';

class GroupService {
    public async getById(id: string): Promise<Group> {
        const group: Group = await Group.findByPk(id);

        if (!group) {
            throw new CustomError('Group not found', { id }, 404);
        }

        return group;
    }

    public async create(data: Group): Promise<Group> {
        try {
            const group: Group = await Group.create(data);

            return group;
        } catch (err) {
            throw new CustomError('Bad request', { data }, 400);
        }
    }

    public async update(id: string, data: Group): Promise<void> {
        try {
            await Group.update(data, {
                where: { id }
            });
        } catch {
            throw new CustomError('Bad request', { id, data }, 400);
        }
    }

    public async delete(id: string): Promise<void> {
        try {
            await Group.destroy({
                where: {
                    id
                }
            });
        } catch {
            throw new CustomError('Bad request', { id }, 400);
        }
    }

    public async addUsersToGroup(groupId: string, usersId: Array<string>): Promise<void> {
        const transaction = await sequelize.transaction();

        try {
            await Promise.all(usersId.map((id) => {
                return UserGroup.create({
                    UserId: id,
                    GroupId: groupId
                }, {
                    transaction
                });
            }));

            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
            throw new CustomError('Bad request', { groupId, usersId }, 400);
        }
    }
}

export default GroupService;
