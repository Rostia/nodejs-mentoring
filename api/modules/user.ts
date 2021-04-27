import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/connect';

class User extends Model {
    id!: number;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        login: {
            type: new DataTypes.STRING(128),
            allowNull: false
        },
        password: {
            type: new DataTypes.STRING(128),
            allowNull: false
        },
        age: {
            type: new DataTypes.INTEGER(),
            allowNull: true,
            defaultValue: 0
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        tableName: 'users',
        sequelize
    }
);

export default User;
