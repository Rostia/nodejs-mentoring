import user from '../modules/user';
import { Op } from 'sequelize';
import UserType from '../types/user';

class UserService {
    public static async getById(id: number): Promise<UserType> {
        try {
            const result: UserType = await user.findByPk(id);

            return result;
        } catch {
            throw new Error('404 User not found');
        }
    }

    public static async create(data: UserType): Promise<UserType> {
        try {
            const result: UserType = await user.create(data);

            return result;
        } catch (err) {
            throw new Error(err);
        }
    }

    public static async update(id: number, data: UserType): Promise<void> {
        try {
            await user.update(data, {
                where: { id }
            });
        } catch {
            throw new Error('400 Bad Request');
        }
    }

    public static async delete(id: number): Promise<void> {
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

    public static async search(login: string, limit: number): Promise<Array<UserType>> {
        try {
            const results: Array<UserType> = await user.findAll({
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
