import { Group, UserGroup } from '../models';
import sequelize from '../db/connect';

class GroupService {
    public async getById(id: string): Promise<Group> {
        try {
            const group: Group = await Group.findByPk(id);

            return group;
        } catch {
            throw new Error('404 Group not found');
        }
    }

    public async create(data: Group): Promise<Group> {
        try {
            const group: Group = await Group.create(data);

            return group;
        } catch (err) {
            throw new Error(err);
        }
    }

    public async update(id: string, data: Group): Promise<void> {
        try {
            await Group.update(data, {
                where: { id }
            });
        } catch {
            throw new Error('400 Bad Request');
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
            throw new Error('400 Bad Request');
        }
    }

    public async addUsersToGroup(groupId: string, usersId: Array<string>): Promise<void> {
        const transaction = await sequelize.transaction();

        try {
            await Promise.all(usersId.map((id) => {
                return UserGroup.create({
                    UserId: id,
                    GroupId: groupId
                });
            }));

            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
            throw new Error(err);
        }
    }
}

export default GroupService;
