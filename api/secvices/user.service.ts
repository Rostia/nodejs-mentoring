import user from '../modules/user';
import { Op } from 'sequelize';

class UserService {
    public async getById(id: number): Promise<user> {
        try {
            const result: user = await user.findByPk(id);

            return result;
        } catch {
            throw new Error('404 User not found');
        }
    }

    public async create(data: user): Promise<user> {
        try {
            const result: user = await user.create(data);

            return result;
        } catch (err) {
            throw new Error(err);
        }
    }

    public async update(id: number, data: user): Promise<void> {
        try {
            await user.update(data, {
                where: { id }
            });
        } catch {
            throw new Error('400 Bad Request');
        }
    }

    public async delete(id: number): Promise<void> {
        try {
            await user.update({
                isDeleted: true
            }, {
                where: { id }
            });
        } catch {
            throw new Error('400 Bad Request');
        }
    }

    public async search(login: string, limit: number): Promise<Array<user>> {
        try {
            const results: Array<user> = await user.findAll({
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
