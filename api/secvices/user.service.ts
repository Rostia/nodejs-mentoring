import { User, Group } from '../models';
import { Op } from 'sequelize';
import CustomError from '../errors/custom.error';

class UserService {
    public async getById(id: number): Promise<User> {
        const user: User = await User.findByPk(id, {
            include: Group
        });

        if (!user) {
            throw new CustomError('User not found', { id }, 404);
        }

        return user;
    }

    public async create(data: User): Promise<User> {
        try {
            const result: User = await User.create(data);

            return result;
        } catch (err) {
            throw new CustomError('Bad request', { data }, 400);
        }
    }

    public async update(id: number, data: User): Promise<void> {
        try {
            await User.update(data, {
                where: { id }
            });
        } catch {
            throw new CustomError('Bad request', { data, id }, 400);
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
            throw new CustomError('Bad request', { id }, 400);
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
            throw new CustomError('Bad request', { login, limit }, 400);
        }
    }

    public async getByLogAndPass(login: string, password: string): Promise<User> {
        try {
            const results: User = await User.findOne({
                where: {
                    login,
                    password
                }
            });

            return results;
        } catch {
            throw new CustomError('Bad request', { login, password }, 400);
        }
    }
}

export default UserService;
