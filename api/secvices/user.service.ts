import { User, Group } from '../models';
import { Op } from 'sequelize';

class UserService {
    public async getById(id: number): Promise<User> {
        try {
            const user: User = await User.findByPk(id, {
                include: Group
            });

            return user;
        } catch (err) {
            throw new Error(err);
        }
    }

    public async create(data: User): Promise<User> {
        try {
            const result: User = await User.create(data);

            return result;
        } catch (err) {
            throw new Error(err);
        }
    }

    public async update(id: number, data: User): Promise<void> {
        try {
            await User.update(data, {
                where: { id }
            });
        } catch {
            throw new Error('400 Bad Request');
        }
    }

    public async delete(id: number): Promise<void> {
        try {
            await User.update({
                isDeleted: true
            }, {
                where: { id }
            });
        } catch {
            throw new Error('400 Bad Request');
        }
    }

    public async search(login: string, limit: number): Promise<Array<User>> {
        try {
            const results: Array<User> = await User.findAll({
                where: {
                    login: {
                        [Op.like]: `%${login}%`
                    },
                    isDeleted: false
                },
                limit
            });

            return results;
        } catch {
            throw new Error('400 Bad Request');
        }
    }
}

export default UserService;
